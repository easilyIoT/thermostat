import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';

import { UserService } from 'user/user.service';
import { User } from 'user/user.entity';

import { JWTGuard } from "guards/JWTGuard.guard"

@Controller('user')
export class UserController {

        constructor(
                private readonly userService: UserService
        ) { }


        @Get()
        getUsers(): Promise<User[]> {
                return this.userService.findAll();
        }

        @Get(":id")
        getUser(@Param("id") id: string): Promise<User> {
                return this.userService.findOneWithID(id);
        }
}
