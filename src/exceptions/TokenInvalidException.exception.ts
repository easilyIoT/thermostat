import { HttpException, HttpStatus } from "@nestjs/common"



export class TokenInvalidException extends HttpException {
        constructor() {
                super({
                        token: false
                }, HttpStatus.BAD_REQUEST);
        }
}


