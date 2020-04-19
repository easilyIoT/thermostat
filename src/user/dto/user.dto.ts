import { IsString } from 'class-validator';

import { InputType, Field } from "type-graphql"

@InputType()
export class SaveGroupDto {

        @Field()
        @IsString()
        readonly group: string;
        
}