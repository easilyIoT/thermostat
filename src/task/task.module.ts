import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { HttpModule } from "@nestjs/common"

import { AuthModule } from "../auth/auth.module"

import { TaskService } from "./task.service";
import { TaskController } from './task.controller';
import { Task } from "./task.entity";
import { TaskResolver } from './task.resolver';

import { DateScalar } from "../common/scalars/Date"

@Module({
        imports: [
                TypeOrmModule.forFeature([Task]),
                HttpModule,
                AuthModule
        ],
        controllers: [TaskController],
        providers: [TaskService, TaskResolver, DateScalar],
})
export class TaskModule { }
