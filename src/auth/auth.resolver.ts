import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config"

import { JoiValidationPipe } from "pipes/JoiValidationPipe.pipe"

import { LoginInput, TokenResponse, RegisterInput } from "auth/auth.input"
import { AuthenticationService } from "auth/auth.service"
import { OauthService } from "auth/oauth.service"

import { JWTGuard } from 'guards/JWTGuard.guard';

import { User } from "decorators/User.decorator"
import { Email, Password } from "auth/auth.decorator"
import { emailSchema, passwordSchema } from "auth/auth.schema"

import { User as UserEntity } from 'user/user.entity';
import { UserService } from 'user/user.service';


@Resolver('Auth')
@UseGuards(JWTGuard)
export class AuthResolver {

        constructor(
                private readonly authService: AuthenticationService,
                private readonly oauthService: OauthService,
                private readonly userService: UserService,
                private readonly config: ConfigService
        ) { }


        @Mutation(returns => TokenResponse)
        async login(
                @Args("email") email: string,
                @Args("password") password: string

        ): Promise<TokenResponse> {
                const user: UserEntity | undefined = await this.userService.findOneWithEmail(email);

                if (!user)
                        throw new BadRequestException("Email not found");

                const isValid = await this.authService.checkPassword(password, user);

                if (!isValid)
                        throw new BadRequestException("Passowrd is wrong");


                return {
                        token: await this.authService.generateNewToken(user)
                };
        }

        @Mutation(returns => UserEntity)
        async register(
                @Args("email") @Email(new JoiValidationPipe<string>(emailSchema)) email: string,
                @Args("password") @Password(new JoiValidationPipe<string>(passwordSchema)) password: string
        ) {
                const emailAlreadyExists = await this.userService.checkIfEmailExist(email);

                if (emailAlreadyExists)
                        throw new BadRequestException("Email already exists");
                
                
                return await this.userService.create(email, await this.authService.cryptPassword(password));
        }

        @Query(returns => UserEntity)
        async me(
                @User() user: UserEntity
        ) {
                return user;
        }

}
