import { UseGuards, BadRequestException } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ConfigService } from "@nestjs/config"

import { LoginInput, TokenResponse, RegisterInput } from "auth/auth.input"
import { AuthenticationService } from "auth/auth.service"
import { OauthService } from "auth/oauth.service"

import { JWTGuard } from 'guards/JWTGuard.guard';

import { User } from "decorators/User.decorator"

import { User as UserEntity } from 'user/user.entity';
import { UserService } from 'user/user.service';


@Resolver('Auth')
export class AuthResolver {

        constructor(
                private readonly authService: AuthenticationService,
                private readonly oauthService: OauthService,
                private readonly userService: UserService,
                private readonly config: ConfigService
        ) { }


        @Mutation(returns => TokenResponse)
        async login(
                @Args("loginInput") loginInput: LoginInput,
        ): Promise<TokenResponse> {
                const user: UserEntity | undefined = await this.userService.findOneWithEmail(loginInput.email);

                if (!user)
                        throw new BadRequestException("Email not found");

                const isValid = await this.authService.checkPassword(loginInput.password, user);

                if (!isValid)
                        throw new BadRequestException("Passowrd is wrong");


                return {
                        token: await this.authService.generateNewToken(user)
                };
        }

        @Mutation(returns => UserEntity)
        async register(
                @Args("loginInput") loginInput: RegisterInput,
        ) {
                const emailAlreadyExists = await this.userService.checkIfEmailExist(loginInput.email);

                if (emailAlreadyExists)
                        throw new BadRequestException("Email already exists");
                
                
                return await this.userService.create(loginInput.email, await this.authService.cryptPassword(loginInput.password));
        }

}
