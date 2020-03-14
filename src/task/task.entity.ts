import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"


@Entity()
@ObjectType()
export class Task {
        
        @ObjectIdColumn()
        @Field(() => ID)
        id: ObjectID;

        @Column()
        @Field()
        name: string;

        @Column()
        @Field()
        owner: string;

        @Column()
        @Field()
        start: Date;

        @Column()
        @Field()
        done: Date;
}