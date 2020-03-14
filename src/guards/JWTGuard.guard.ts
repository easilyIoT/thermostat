import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql"
import { Request } from "express"

import { AuthenticationService } from '../auth/auth.service';

import { UserService } from '../user/user.service';

import { GraphQlctx } from "types"

@Injectable()
export class JWTGuard implements CanActivate {
        
        constructor(
                private readonly authService: AuthenticationService,
                private readonly userService: UserService
        ) { }

        async canActivate(ctx: ExecutionContext): Promise<boolean> {
                let auth_token;
                let userStorage;

                if (ctx.getType<GqlContextType>() === "graphql") {
                        const gqlCtx = GqlExecutionContext.create(ctx).getContext<GraphQlctx>();
                        auth_token = gqlCtx.authorization
                        userStorage = gqlCtx;
                } else {
                        const req = ctx.switchToHttp().getRequest<Request>();
                        auth_token = req.headers.authorization;
                        userStorage = req;
                }
                
                if (!auth_token)
                        throw new UnauthorizedException("Authorization header not found");
                
                
                if (!this.authService.isTokenStillAlive(auth_token))
                        throw new UnauthorizedException("token expired");
                

                const id = this.authService.decodeToken(auth_token)["id"];
                const user = await this.userService.findOneWithID(id);

                if (!user)
                        throw new UnauthorizedException("User dont exists");
                
                userStorage.user = user;

                return true;
        }
}

