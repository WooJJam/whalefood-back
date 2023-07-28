import dotenv from "dotenv";

dotenv.config({
  path: `config/.env.${process.env.NODE_ENV || "development"}`
});

export const env = {
    database: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      logging: process.env.LOGGING
    },
    swagger: {
      route: process.env.SWAGGER_ROUTE || "/api-docs"
    },
    sessionkey:{
      secretkey:process.env.SESSION_SECRET_KEY
    },
    app: {
      port:Number(process.env.PORT)
    },
    api: {
      gptkey:process.env.CHATGPT_API_KEY
    }
  };