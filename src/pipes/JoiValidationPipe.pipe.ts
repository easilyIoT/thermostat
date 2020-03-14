import { PipeTransform, ArgumentMetadata, Injectable } from "@nestjs/common"
import { Schema } from "@hapi/joi"

import { JoiValidationException } from "../exceptions/JoiValidationException.exception"

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform<T> {
        
        constructor(
                private readonly schema: Schema
        ) { }

        transform(value: T, metadata: ArgumentMetadata) {
                
                const { error } = this.schema.validate(value);
        
                if (error)
                        throw new JoiValidationException(error);
                
                return value;
        }
}