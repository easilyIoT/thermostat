import { User } from "user/user.entity"


export type GraphQlctx = {
        authorization: string,
        user: User
}