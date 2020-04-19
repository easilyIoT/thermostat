import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, UseGuards } from '@nestjs/common';

import { JoiValidationPipe } from "../pipes/JoiValidationPipe.pipe"

import { JWTGuard } from "../guards/JWTGuard.guard"

import { User } from 'decorators/User.decorator';

import { TaskService } from "./task.service";
import { Task } from "./task.entity"
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { createTaskSchema, updateTaskSchema } from './task.schema';

import { User as UserEntity } from "../user/user.entity"


@Controller('task')
@UseGuards(JWTGuard)
export class TaskController {

        constructor(
              private readonly taskService: TaskService   
        ) { }
        
        @Get()
        async findAll(@User() user: UserEntity) {
                return {
                        tasks: await this.taskService.getTasks(user) || []
                };
        }

        @Post()
        @UsePipes(new JoiValidationPipe(createTaskSchema))
        create(@Body() task: CreateTaskDto, @User() user: UserEntity) {
                this.taskService.createTask(task, user);
        }

        @Get(":id")
        async findOne(@Param("id") id: string, @User() user: UserEntity) {
                return {
                        task: await this.taskService.getTask(id, user) || {}
                }
        }

        @Put(":id")
        @UsePipes(new JoiValidationPipe(updateTaskSchema))
        update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto, @User() user: UserEntity): string {
                return `updated this id: ${id}`
        }

        @Delete(":id")
        delete(@Param("id") id: string, @User() user: UserEntity): void {
                this.taskService.deleteTask(id, user);
        }

}
