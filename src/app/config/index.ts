import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  EXPRESSSESSIONSECRET: process.env.EXPRESSSESSIONSECRET,

  JWT: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION as string,
  },
  REDIS: {
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: process.env.REDIS_PORT as string,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
  },
  SMTP: {
    SMTP_HOST: process.env.SMTP_HOST as string,
    SMTP_PORT: process.env.SMTP_PORT as string,
    SMTP_USER: process.env.SMTP_USER as string,
    SMTP_PASS: process.env.SMTP_PASS as string,
    SMTP_FROM: process.env.SMTP_FROM as string,
  },
  PASSPORT_GOOGLE: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  },
  SSLCOMMERZ: {
    SSL_STORE_ID: process.env.SSL_STORE_ID as string,
    SSL_STORE_PASS: process.env.SSL_STORE_PASS as string,
    SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
    SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
    SLL_SUCCESS_BACKEND_URL: process.env.SLL_SUCCESS_BACKEND_URL as string,
    SLL_FAIL_BACKEND_URL: process.env.SLL_FAIL_BACKEND_URL as string,
    SLL_CANCEL_BACKEND_URL: process.env.SLL_CANCEL_BACKEND_URL as string,
    SLL_SUCCESS_FRONTEND_URL: process.env.SLL_SUCCESS_FRONTEND_URL as string,
    SLL_FAIL_FRONTEND_URL: process.env.SLL_FAIL_FRONTEND_URL as string,
    SLL_CANCEL_FRONTEND_URL: process.env.SLL_CANCEL_FRONTEND_URL as string,
  },
};
