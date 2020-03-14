import { InputType, ObjectType, Field } from "type-graphql"

@ObjectType()
export class TokenResponse {
        @Field() readonly token: string
}


@InputType()
export class LoginInput { 
        @Field() readonly email: string;
        @Field() readonly password: string
}

@InputType() 
export class RegisterInput { 
        @Field() readonly email: string;
        @Field() readonly password: string
}