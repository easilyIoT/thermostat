import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserService } from 'user/user.service';
import { User } from 'user/user.entity';
import { ID } from 'type-graphql';

@Resolver('User')
export class UserResolver {

        constructor(
                private readonly userService: UserService
        ) { }

        @Query(returns => [User])
        getUsers(): Promise<User[]> {
                return this.userService.findAll();
        }

        @Query(returns => User)
        getUser(@Args({ name: "id", type: () => ID }) id: string): Promise<User> {
                return this.userService.findOneWithID(id);
        }
}
