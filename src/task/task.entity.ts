import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

import { Time } from 'task/interfaces/time';


@Entity()
@ObjectType()
export class Task {
        
        @ObjectIdColumn()
        @Field(type => ID)
        id: ObjectID;

        @Column()
        @Field()
        name: string;

        @Column()
        @Field()
        owner: string;

        @Column()
        @Field(() => Time)
        start: Time;

        @Column()
        @Field(() => Time)
        done: Time;

        @Column()
        @Field()
        daily: boolean;
}