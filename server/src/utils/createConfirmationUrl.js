import { v4 } from "uuid";
import redis from "../redis";

import { confirmUserPrefix } from "../constants/redisPrefixes";

export default async userId => {
  const token = v4();
  await redis.set(`${confirmUserPrefix}${token}`, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `https://react-instagram-clone-client.herokuapp.com/confirm-user/${token}`;
};
