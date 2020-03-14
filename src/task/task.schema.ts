import * as Joi from "@hapi/joi"

import { CreateTaskDto, UpdateTaskDto } from "./dto/task.dto"

export const createTaskSchema = Joi.object<CreateTaskDto>({
        name: Joi.string().required(),

        start: Joi.number().required(),
        done: Joi.number().required()
})


export const updateTaskSchema = Joi.object<UpdateTaskDto>({
        name: Joi.string(),

        start: Joi.number(),
        done: Joi.number()
}).min(1);