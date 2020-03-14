import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"

import { TaskModule } from './task/task.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import configuration from "./config/configuration"



@Module({
	imports: [
		TypeOrmModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration]
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: "schema.graphql",
			context: ({ req }) => ({ authorization: req.headers.authorization })
		}),
		TaskModule,
		CommonModule,
		AuthModule,
		UserModule
	],
})
export class AppModule { }
