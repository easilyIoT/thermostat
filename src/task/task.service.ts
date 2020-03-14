import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";

import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/task.dto"
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {

        constructor(
                @InjectRepository(Task) private readonly taskRepo: Repository<Task>
        ) { }
        
        public createTask = async (taskDto: CreateTaskDto, user: User): Promise<Task> => {
                return await this.taskRepo.save({
                        ...taskDto,
                        owner: user.id.toString()
                });
        }

        public getTasks = async (user: User): Promise<Task[]> => {
                return await this.taskRepo.find({
                        owner: user.id.toString()
                });
        }

        public getTask = async (id: string, user: User): Promise<Task> => {
                return await this.taskRepo.findOne({
                        id,
                        owner: user.id.toString()
                });
        }

        public deleteTask = async (id: string, user: User): Promise<any> => {
                return await this.taskRepo.delete({
                        id,
                        owner: user.id.toString()
                });
        }

}