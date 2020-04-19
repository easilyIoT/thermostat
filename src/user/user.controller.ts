import { Controller, Get, Post, Delete, Param, UseGuards, Body, Inject, forwardRef } from '@nestjs/common';

import { User } from "decorators/User.decorator"

import { UserService } from 'user/user.service';
import { User as UserEntity } from 'user/user.entity';
import { SaveGroupDto } from 'user/dto/user.dto';

import { JWTGuard } from "guards/JWTGuard.guard"

@Controller('user')
export class UserController {

        constructor(
                private readonly userService: UserService
        ) { }


        @Get()
        getUsers(): Promise<UserEntity[]> {
                return this.userService.findAll();
        }

        @Get(":id")
        getUser(@Param("id") id: string): Promise<UserEntity> {
                return this.userService.findOneWithID(id);
        }

        @Post("/saveGroup")
        @UseGuards(JWTGuard)
        saveNewGroup(@User() user: UserEntity, @Body() saveGroup: SaveGroupDto) {
                this.userService.saveGroup(user.id.toString(), saveGroup.group);
        }
}
