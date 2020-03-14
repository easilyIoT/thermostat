import { HttpException, HttpStatus } from "@nestjs/common"
import { ValidationError } from "@hapi/joi";

export class JoiValidationException extends HttpException {
        constructor(error: ValidationError) {
                super(error.message, HttpStatus.BAD_REQUEST);
        }
}