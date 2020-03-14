import { Module, HttpModule } from '@nestjs/common';
import { AuthenticationService } from "./auth.service"
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { OauthService } from './oauth.service';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
        imports: [HttpModule, UserModule],
        controllers: [AuthController],
        providers: [AuthResolver, AuthenticationService, OauthService],
        exports: [AuthenticationService, OauthService, UserModule]
})
export class AuthModule {}
