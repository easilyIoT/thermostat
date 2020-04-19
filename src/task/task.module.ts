import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { HttpModule } from "@nestjs/common"

import { AuthModule } from "auth/auth.module"
import { UserModule } from 'user/user.module';

import { TaskService } from "task/task.service";
import { TaskController } from 'task/task.controller';
import { Task } from "task/task.entity";
import { TaskResolver } from 'task/task.resolver';


@Module({
        imports: [
                TypeOrmModule.forFeature([Task]),
                HttpModule,
                forwardRef(() => AuthModule),
                forwardRef(() => UserModule)
        ],
        controllers: [TaskController],
        providers: [TaskService, TaskResolver],
})
export class TaskModule { }
