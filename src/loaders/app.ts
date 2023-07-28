import "reflect-metadata";
import express from "express";
import {
  useContainer as routingUseContainer,
  useExpressServer
} from "routing-controllers";
import morgan from "morgan";
import { routingControllerOptions } from "../utils/RoutingConfig";
import { logger, stream } from "../utils/Logger";
import { Container } from "typedi";
import bodyParser from "body-parser";
import DataSource from "./database";
import session from 'express-session';
import { useSwagger } from "./swagger";
import { env } from "./env";
const { sessionkey } = env;
declare module 'express-session' {
  interface SessionData {
    user: any;
  }
}

export class App {
  public app: express.Application;
  constructor() {
    this.setDatabase();
    this.app = express();
    this.setMiddlewares();
  }
  private async setDatabase(): Promise<void> {
    try {
      DataSource.initialize()
        .then(() => logger.info("Mysql Connect!"))
        .catch((err) => logger.error(err));
    } catch (error) {
      logger.error(error);
    }
  }
  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan("combined", { stream }));
    this.app.use(session({
      secret: sessionkey.secretkey, // 세션 암호화를 위한 키 (임의로 설정)
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000, // 세션 유효 기간 (1시간)
      },
    }))
  }
  public async init(port: number): Promise<void> {
    try {
      routingUseContainer(Container);
      useExpressServer(this.app, routingControllerOptions);
      useSwagger(this.app);
      this.app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}/api-docs`);
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
