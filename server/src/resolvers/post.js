import { combineResolvers } from "graphql-resolvers";
import mongoose from "mongoose";

import { isAuthenticated } from "./authorization";
import fromCursorHash from "../utils/fromCursorHash";
import toCursorHash from "../utils/toCursorHash";

export default {
  Query: {
    posts: async (parent, { cursor, limit = 100 }, { models }) => {
      const posts = await models.Post.find(
        cursor ? { createdAt: { $lt: fromCursorHash(cursor) } } : null,
        null,
        {
          limit: limit + 1,
          sort: {
            createdAt: -1 //Sort by Date Added DESC
          }
        }
      );

      const hasNextPage = posts.length > limit;
      const edges = hasNextPage ? posts.slice(0, -1) : posts;
      const totalCount = await models.Post.countDocuments();

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
    },

    post: async (parent, { id }, { models }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      return await models.Post.findById(id);
    }
  },

  Mutation: {
    createPost: combineResolvers(
      isAuthenticated,
      async (parent, { pictureUrl, caption }, { req, models }) => {
        const post = new models.Post({
          caption,
          pictureUrl,
          author: req.session.userId
        });
        await post.save();

        return post;
      }
    ),

    likePost: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { req, models }) => {
        const post = await models.Post.findById(id);

        if (post.likes.find(userId => userId.toString() === req.session.userId))
          return false;

        post.likes = [...post.likes, req.session.userId];
        await post.save();
        return true;
      }
    ),

    unlikePost: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { req, models }) => {
        const post = await models.Post.findById(id);

        if (
          !post.likes.find(userId => userId.toString() === req.session.userId)
        )
          return false;

        post.likes = post.likes.filter(
          userId => userId.toString() !== req.session.userId
        );
        await post.save();
        return true;
      }
    )
  },

  Post: {
    author: async (post, args, { models }) => {
      return await models.User.findById(post.author);
    },
    comments: async (post, args, { models }) => {
      return await models.Comment.find({ post: post.id });
    },
    viewerHasStarred: async (post, args, { req, models }) => {
      return !!post.likes.find(
        userId => userId.toString() === req.session.userId
      );
    }
  }
};
