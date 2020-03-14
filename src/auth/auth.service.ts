import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from "bcrypt"
import { sign, decode, verify } from "jsonwebtoken"
import { User } from "../user/user.entity"

@Injectable()
export class AuthenticationService {

        constructor(
                private readonly config: ConfigService
        ) { }

        async generateNewToken(user: User) {
                return sign({
                        id: user.id,
                        email: user.email
                }, process.env.JWT_SECRET, {
                        expiresIn: "2 days"
                });
        }

        decodeToken(token: string) {
                return decode(token);
        }

        isTokenStillAlive(token: string): boolean {
                try {
                        return !!verify(token, process.env.JWT_SECRET);
                } catch (e) {
                        return false;
                }
        }

        async checkPassword(pwToBeValidated: string, user: User): Promise<boolean> {
                return await compare(pwToBeValidated, user.password);
        }

        async cryptPassword(password: string): Promise<string> {
                const salt = await genSalt(10);
                return await hash(password, salt);
        }
}