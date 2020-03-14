import { Module } from '@nestjs/common';

import { DateScalar } from "./scalars/Date"

@Module({
        providers: [
                DateScalar
        ],
        //exports: [DateScalar]
})
export class CommonModule {}
