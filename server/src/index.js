import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import redis from "./redis";
import schema from "./schema";
import resolvers from "./resolvers";
import models from "./models";
import fileRoutes from "./routes/file-upload";

const server = new ApolloServer({
  introspection: true,
  playground: true,
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

app.use(
  cors({
    credentials: true,
    origin: process.env.DOMAIN
  })
);

app.use(bodyParser.json());
app.use("/api/", fileRoutes);

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
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  })
);

server.applyMiddleware({ app, path: "/graphql", cors: false });

app.on("ready", () => {
  app.listen({ port: process.env.PORT || 8000 });
});

mongoose.connect(process.env.DATABASE, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
  app.emit("ready");
});
