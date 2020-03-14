import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User])
	],
	controllers: [UserController],
	providers: [UserService, UserResolver],
	exports: [UserService]
})
export class UserModule { }
