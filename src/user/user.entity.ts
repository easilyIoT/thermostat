import { ObjectIdColumn, Column, Entity, ObjectID } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql"

@Entity()
@ObjectType()
export class User {

        @ObjectIdColumn()
        @Field(() => ID)
        readonly id: ObjectID;
        
        @Column()
        @Field()
        readonly email: string;

        @Column()
        @Field()
        readonly password: string;
        

        @Column({
                nullable: true,
                update: true
        })
        @Field({
                nullable: true
        })
        readonly refresh_token: string;

        @Column({
                nullable: true,
                update: true
        })
        @Field({
                nullable: true
        })
        readonly access_token: string;
}