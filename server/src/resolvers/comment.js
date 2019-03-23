export default {
  Mutation: {
    createComment: async (parent, { postId, text }, { req, models }) => {
      const comment = new models.Comment({
        text,
        author: req.session.userId,
        post: postId
      });
      await comment.save();

      return comment;
    }
  },
  Comment: {
    author: async (comment, args, { models }) => {
      return await models.User.findById(comment.author);
    },
    post: async (comment, args, { models }) => {
      return await models.Post.findById(comment.post);
    }
  }
};
