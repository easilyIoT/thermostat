import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthenticationService } from "../auth/auth.service"
import { UserService } from '../user/user.service';

export class Oauth implements CanActivate {
        constructor(
                private readonly auth: AuthenticationService,
                private readonly userSerivce: UserService
        ) { }

        canActivate(ctx: ExecutionContext) {

                return true;
        }
}