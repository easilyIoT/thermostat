import * as Joi from "@hapi/joi"

import { CreateTaskDto, UpdateTaskDto } from "./dto/task.dto"
import { Time } from 'task/interfaces/time';

export const createTaskSchema = Joi.object<CreateTaskDto>({
        name: Joi.string().required(),

        start: Joi.object<Time>({
                hour: Joi.number().required(),
                minute: Joi.number().required()
        }).required(),
        done: Joi.object<Time>({
                hour: Joi.number().required(),
                minute: Joi.number().required()
        }).required()
});


export const updateTaskSchema = Joi.object<UpdateTaskDto>({
        name: Joi.string(),

        start: Joi.object<Time>({
                hour: Joi.number().required(),
                minute: Joi.number().required()
        }),
        done: Joi.object<Time>({
                hour: Joi.number().required(),
                minute: Joi.number().required()
        })
}).min(1);