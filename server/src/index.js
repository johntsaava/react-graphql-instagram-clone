import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import mongoose from "mongoose";

import redis from "./redis";
import schema from "./schema";
import resolvers from "./resolvers";
import models from "./models";
import seedDb from "./utils/seedDb";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, res }) => ({
    req,
    res,
    models
  })
});

const app = express();

const RedisStore = connectRedis(session);

app.use("/pictures", express.static(__dirname + "/../pictures"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

app.use(
  session({
    store: new RedisStore({
      client: redis
    }),
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  })
);

server.applyMiddleware({ app, cors: false });

app.on("ready", () => {
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `Apollo Server on http://localhost:${process.env.PORT || 4000}/graphql`
    );
  });
});

const TESTING = false;

mongoose.connect(
  `mongodb://localhost/${
    TESTING ? process.env.TEST_DATABASE : process.env.DATABASE
  }`,
  {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  },
  async () => {
    if (TESTING) {
      await mongoose.connection.db.dropDatabase();
      await seedDb();
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
  app.emit("ready");
});
