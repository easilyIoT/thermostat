import {
        Controller,
        Get,
        Query,
        Post,
        HttpCode,
        BadRequestException,
        UseGuards,
        Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { JoiValidationPipe } from "pipes/JoiValidationPipe.pipe"

import { JWTGuard } from "guards/JWTGuard.guard"

import { AuthenticationService } from "auth/auth.service"
import { OauthService } from 'auth/oauth.service';
import { Email, Password } from 'auth/auth.decorator';
import { emailSchema, passwordSchema } from 'auth/auth.schema';

import { User } from "decorators/User.decorator";

import { UserService } from 'user/user.service';
import { User as UserEntity } from "user/user.entity";

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
        loginStatus(@User() user: UserEntity): { user: UserEntity } {
                return {
                        user
                };
        }

        @Post("/regenToken")
        async regenAccessToken(@User() user: UserEntity) {
                const access_token = await this.oauthService.getNewAuthToken(user.refresh_token);

                await this.userService.saveNewAccessToken(user.id.toString(), access_token);
        }

        @Post("/generateState")
        @UseGuards(JWTGuard)
        generateState(@User() user: UserEntity) {
                return {
                        state: this.oauthService.genState(user)
                };
        }

        @Get("/callback")
        async getCode(@Query("code") code: string, @Query("state") state: string, @Res() res: Response) {

                if (this.authService.isTokenStillAlive(state))
                        throw new BadRequestException("state expired");


                const { access_token, refresh_token } = await this.oauthService.exchangeCode(code);

                const userID = this.authService.decodeToken(state)["user"];
                await this.userService.completeRegistration(userID, access_token, refresh_token);


                res.redirect(`${this.config.get<string>("frontend_url")}/complete_registration?success=true`);
        }

}
