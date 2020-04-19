import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "auth/auth.module"

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => AuthModule)
	],
	controllers: [UserController],
	providers: [UserService, UserResolver],
	exports: [UserService]
})
export class UserModule { }
