import { IsString, IsInt, IsDate } from 'class-validator';
import { InputType, Field } from "type-graphql"

import { Time } from "task/interfaces/time"

@InputType("CreateTaskInput")
export class CreateTaskDto {

        @Field()
        @IsString()
        readonly name: string;

        @Field(() => Time)
        readonly start: Time;

        @Field(() => Time)
        readonly done: Time;

        @Field()
        readonly daily: boolean;

}

@InputType("UpdateTaskInput")
export class UpdateTaskDto {

        @Field()
        @IsString()
        readonly name?: string;

        @Field(() => Time)
        @IsInt()
        readonly start?: Time;

        @Field(() => Time)
        @IsInt()
        readonly done?: Time;

        @Field()
        readonly daily: boolean;
}
