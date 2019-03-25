import { v4 } from "uuid";
import redis from "../redis";

import { forgotPasswordPrefix } from "../constants/redisPrefixes";

export default async userId => {
  const token = v4();
  await redis.set(
    `${forgotPasswordPrefix}${token}`,
    userId,
    "ex",
    60 * 60 * 24
  ); // 1 day expiration

  return `https://react-instagram-clone-client.herokuapp.com/change-password/${token}`;
};
