import { Injectable, HttpService, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { sign } from "jsonwebtoken";

import { OauthTokens, OauthTokenResponse } from './interfaces/token'; 
import { User as UserEntity } from 'user/user.entity';


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
                
                try {
                        const { data } = await this.http.post<OauthTokenResponse>(`${this.tokenURL}`, {
                                code,
                                client_id: this.clientID,
                                grant_type: "authorization_code"
                        }).toPromise();

                        return {
                                access_token: data.access_token,
                                refresh_token: data.refresh_token
                        }
                } catch (e) {
                        throw new InternalServerErrorException(e.message);
                }

                
        }

        genState(user: UserEntity): string {
                return sign({
                        user: user.id
                }, process.env.JWT_SECRET, {
                        expiresIn: "360"
                });
        }

        async getNewAuthToken(refresh_token: string): Promise<string> {
                const { data } = await this.http.post<OauthTokenResponse>(`${this.tokenURL}`, {
                        grant_type: "refresh_token",
                        refresh_token,
                }).toPromise();
                
                return data.access_token;
        }


}