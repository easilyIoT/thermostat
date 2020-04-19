import "reflect-metadata";
import "isomorphic-fetch"
import { config } from "dotenv"
config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as helmet from "helmet"
import * as morgan from "morgan"
import { Response, Request } from 'express';

import { AppModule } from 'app.module';

async function bootstrap() {

        const app = await NestFactory.create(AppModule);
        app.enableCors();
        app.use(helmet());
        app.use(morgan("dev", {
                //                skip: (req: Request, res: Response) => req.url !== "/graphql"
        }));

/*        if (process.env.NODE_ENV !== "DEV") {
                const options = new DocumentBuilder()
                        .setTitle('Easily Thermostat')
                        .setDescription('Easily Thermostat api server that own users and task schedulation')
                        .setVersion('1.0')
                        .addTag('task')
                        .addTag("iot")
                        .build();

                const document = SwaggerModule.createDocument(app, options);
                SwaggerModule.setup('api', app, document);
        }*/

        //LogRocket.init("phuvdi/easily-thermostat");

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
                        NODE_ENV: "PRODUCTION" | "DEV" | "TEST"
                }
        }
}