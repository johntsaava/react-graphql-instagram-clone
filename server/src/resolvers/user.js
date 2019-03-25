import { combineResolvers } from "graphql-resolvers";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { isAdmin } from "./authorization";
import redis from "../redis";
import sendEmail from "../utils/sendEmail";
import {
  confirmUserPrefix,
  forgotPasswordPrefix
} from "../constants/redisPrefixes";
import createConfirmationUrl from "../utils/createConfirmationUrl";
import createChangePasswordUrl from "../utils/createChangePasswordUrl";

import fromCursorHash from "../utils/fromCursorHash";
import toCursorHash from "../utils/toCursorHash";

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.find();
    },

    user: async (parent, { id, username }, { models }) => {
      if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await models.User.findById(id);
      }
      if (username) {
        return await models.User.findOne({ username });
      }
    },
    me: async (parent, args, { req, models }) => {
      const { userId } = req.session;
      if (!userId) return null;

      return await models.User.findById(userId);
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { input: { firstName, lastName, username, email, password } },
      { models }
    ) => {
      const user = new models.User({
        firstName,
        lastName,
        username,
        email,
        password:
          password.length >= 6 && password.length <= 42
            ? await bcrypt.hash(password, 12)
            : ""
      });
      await user.save();

      const url = await createConfirmationUrl(user.id);

      sendEmail(user.email, url);

      return user;
    },

    signIn: async (parent, { login, password }, { req, models }) => {
      let user = await models.User.findByLogin(login);
      if (!user) return null;

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;

      if (!user.confirmed) return null;

      req.session.userId = user.id;

      return user;
    },

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        if (!mongoose.Types.ObjectId.isValid(id)) return false;
        return await models.User.findByIdAndDelete(id);
      }
    ),

    confirmUser: async (parent, { token }, { models }) => {
      const userId = await redis.get(`${confirmUserPrefix}${token}`);
      if (!userId) return false;

      await models.User.findByIdAndUpdate(userId, { confirmed: true });

      await redis.del(`${confirmUserPrefix}${token}`);

      return true;
    },

    forgotPassword: async (parent, { login }, { models }) => {
      const user = await models.User.findByLogin(login);
      if (!user) return true;

      const url = await createChangePasswordUrl(user.id);
      sendEmail(user.email, url);

      return true;
    },

    changePassword: async (
      parent,
      { input: { token, password } },
      { req, models }
    ) => {
      const userId = await redis.get(`${forgotPasswordPrefix}${token}`);
      if (!userId) return null;

      const user = await models.User.findByIdAndUpdate(userId, {
        password:
          password.length >= 6 && password.length <= 42
            ? await bcrypt.hash(password, 12)
            : ""
      });
      await redis.del(`${forgotPasswordPrefix}${token}`);

      req.session.userId = userId;

      return user;
    },

    logout: (parent, args, { req, res }) => {
      return new Promise((resolve, reject) =>
        req.session.destroy(err => {
          if (err) return reject(false);
          res.clearCookie("qid");
          return resolve(true);
        })
      );
    },

    editAccount: async (parent, { input }, { req, models }) => {
      await models.User.findOneAndUpdate(req.session.userId, input);

      return await models.User.findById(req.session.userId);
    }
  },

  User: {
    fullName: user => {
      return `${user.firstName} ${user.lastName}`;
    },
    posts: async (user, { cursor, limit = 100 }, { models }) => {
      let options = { author: user.id };
      if (cursor) options.createdAt = { $lt: fromCursorHash(cursor) };

      const posts = await models.Post.find(options, null, {
        limit: limit + 1,
        sort: {
          createdAt: -1 //Sort by Date Added DESC
        }
      });

      const hasNextPage = posts.length > limit;
      const edges = hasNextPage ? posts.slice(0, -1) : posts;
      const totalCount = await models.Post.countDocuments({ author: user.id });

      return {
        edges,
        pageInfo: {
          hasNextPage,
          totalCount,
          endCursor:
            posts.length > 0 &&
            toCursorHash(posts[posts.length - 1].createdAt.toString())
        }
      };
    }
  }
};
