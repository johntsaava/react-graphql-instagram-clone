import { GraphQLUpload } from "graphql-upload";
import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "./user";
import postResolvers from "./post";
import commentResolvers from "./comment";

const customScalarResolver = {
  Date: GraphQLDateTime,
  PictureUpload: GraphQLUpload
};

export default [
  customScalarResolver,
  userResolvers,
  postResolvers,
  commentResolvers
];
