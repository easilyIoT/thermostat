import "reflect-metadata";
import "isomorphic-fetch"
import { config } from "dotenv"
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as LogRocket from "logrocket"

async function bootstrap() {

	const app = await NestFactory.create(AppModule);
        
        LogRocket.init("phuvdi/easily-thermostat");

        await app.listen(process.env.PORT);
}


bootstrap();

declare global {
        namespace NodeJS {
                interface ProcessEnv {
                        DB_USER: string;
                        DB_PW: string;
                        DB_NAME: string

                        OAUTH_CLIENT_ID: string,
                        OAUTH_CLIENT_SECRET: string

                        JWT_SECRET: string
                }
        }
}