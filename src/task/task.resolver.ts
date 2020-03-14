import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ID } from "type-graphql"

import { Task } from "./task.entity";
import { TaskService } from "./task.service"
import { CreateTaskDto } from './dto/task.dto';
import { UseGuards } from '@nestjs/common';

import { JWTGuard } from 'guards/JWTGuard.guard';

import { User as UserEntity } from 'user/user.entity';

import { User } from "decorators/User.decorator"

@Resolver(of => Task)
@UseGuards(JWTGuard)
export class TaskResolver {

        constructor(
                private readonly taskService: TaskService
        ) { }

        @Query(returns => [Task])
        getTasks(@User() user: UserEntity): Promise<Task[]> {
                return this.taskService.getTasks(user);
        }

        @Query(returns => Task)
        getTask(
                @Args({ name: "id", type: () => ID }) id: string,
                @User() user: UserEntity
        ): Promise<Task> {
                return this.taskService.getTask(id, user);
        }

        @Mutation(returns => Task) 
        createTask(
                @Args("CreateTaskDto") createTask: CreateTaskDto,
                @User() user: UserEntity
        ): Promise<Task> {
                return this.taskService.createTask(createTask, user);
        }
}
