import { createParamDecorator } from "@nestjs/common"
import { Request } from "express"

import { GraphQlctx } from '../types';
import { User as UserEntity } from "../user/user.entity"

export const User = createParamDecorator((data, ctx: GraphQlctx | Request) => Array.isArray(ctx) ? ctx[2].user : ctx.user);


declare global {
        namespace Express {
                interface Request {
                        user: UserEntity
                }
        }
}