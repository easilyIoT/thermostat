import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm';

import { User } from "./user.entity"

@Injectable()
export class UserService {

        constructor(
                @InjectRepository(User) private readonly repository: Repository<User>
        ) { }

        async findAll() {
                return await this.repository.find();
        }

        async findOneWithID(id: string) {
                return await this.repository.findOne(id);
        }

        async findOneWithEmail(email: string) {
                return await this.repository.findOne({
                        email
                });
        }

        async create(email: string, password: string) {
                return await this.repository.save({
                        email,
                        password
                });
        }

        async checkIfEmailExist(email: string): Promise<boolean> {
                const user = await this.repository.findOne({
                        email
                })
                return !!user;
        }

        async completeRegistration(id: string, access_token: string, refresh_token: string) {
                await this.repository.update(id, {
                        access_token,
                        refresh_token
                });
        }

        async saveNewAccessToken(id: string, newToken: string) {
                await this.repository.update(id, {
                        access_token: newToken
                })
        }
}
