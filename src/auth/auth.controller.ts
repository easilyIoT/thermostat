import { Controller, Get, Query, Post, HttpCode, BadRequestException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JoiValidationPipe } from "../pipes/JoiValidationPipe.pipe"

import { JWTGuard } from "../guards/JWTGuard.guard"

import { AuthenticationService } from "./auth.service"
import { OauthService } from './oauth.service';
import { Email, Password } from './auth.decorator';
import { emailSchema, passwordSchema } from './auth.schema';

import { User } from "../decorators/User.decorator";

import { UserService } from '../user/user.service';
import { User as UserEntity } from "../user/user.entity";

@Controller('auth')
export class AuthController {

        constructor(
                private readonly authService: AuthenticationService,
                private readonly oauthService: OauthService,
                private readonly userService: UserService,
                private readonly config: ConfigService
        ) { }
        
        @Post("/register")
        async register(
                @Email(new JoiValidationPipe<string>(emailSchema)) email: string,
                @Password(new JoiValidationPipe<string>(passwordSchema)) password: string
        ) {
                const emailAlreadyExists = await this.userService.checkIfEmailExist(email);

                if (emailAlreadyExists)
                        throw new BadRequestException("Email already exists");
                
                
                const user = await this.userService.create(email, await this.authService.cryptPassword(password));

                return {
                        token: await this.authService.generateNewToken(user)
                };
        }
        
        @Post("/login")
        @HttpCode(200)
        async login(
                @Email() email: string,
                @Password() password: string
        ) {
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

        @Get("/user")
        @UseGuards(JWTGuard)
        loginStatus(@User() user: UserEntity) {
                return {
                        user
                };
        }
        
        @Get("/callback")
        async getCode(@Query("code") code: string) {
                this.oauthService.exchangeCode(code);

                return {
                        statusCode: 301,
                        url: `${this.config.get<string>("frontend_url")}/login?$success=true`
                }
        }

}
