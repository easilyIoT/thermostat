import { IsString, IsInt, IsDate } from 'class-validator';

import { InputType, Field } from "type-graphql"

@InputType()
export class CreateTaskDto {

        @Field()
        @IsString()
        readonly name: string;

        @Field()
        @IsDate()
        readonly start: Date;

        @Field()
        @IsDate()
        readonly done: Date;

}

export class UpdateTaskDto {

        @IsString()
        readonly name?: string;

        @IsInt()
        readonly start?: number;

        @IsInt()
        readonly done?: number;

}
