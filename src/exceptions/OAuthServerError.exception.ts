import { HttpException, HttpStatus } from "@nestjs/common"



export class OAuthServerError extends HttpException {
        constructor() {
                super({
                        message: "OauthServer error"
                }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}


