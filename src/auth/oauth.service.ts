import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from "bcrypt"

import { User } from "../user/user.entity"
import { OauthTokens } from './interfaces/token'; 


@Injectable()
export class OauthService {

        private readonly clientID: string;
        private readonly clientSecret: string;

        private readonly authorizationURL: string;
        private readonly tokenURL: string;

        constructor(
                private readonly http: HttpService,
                private readonly config: ConfigService
        ) { 
                this.clientID = process.env.OAUTH_CLIENT_ID,
                this.clientSecret = process.env.OAUTH_CLIENT_SECRET,
                        
                this.authorizationURL = config.get<string>("authorization_url"),
                this.tokenURL = config.get<string>("token_url")
        }


        async exchangeCode(code: string): Promise<OauthTokens> {
                console.log(code)

                return {
                        auth_token: "",
                        refresh_token: ""
                }
        }

        async getNewAuthToken(refresh_token: string): Promise<string> {
                console.log(refresh_token);
                
                return "token!"
        }


}