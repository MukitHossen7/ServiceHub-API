import { createClient } from "redis";
import config from ".";

const client = createClient({
  username: config.REDIS.REDIS_USERNAME,
  password: config.REDIS.REDIS_PASSWORD,
  socket: {
    host: config.REDIS.REDIS_HOST,
    port: Number(config.REDIS.REDIS_PORT),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("Redis connected successfully");
  }
};
