import { ObjectType, Field, Int, InputType } from 'type-graphql';

@ObjectType("Time")
@InputType("TimeInput")
export class Time {
        
        @Field(type => Int)
        readonly hour: number;
        
        @Field(type => Int)
        readonly minute: number;
}


