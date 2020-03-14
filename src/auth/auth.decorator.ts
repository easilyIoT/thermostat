import { createParamDecorator, BadRequestException } from "@nestjs/common"

import { Request } from "express"

export const Email = createParamDecorator((data, req: Request) => {
        
        const email: string | undefined = req.body.email;

        if (!email)
                throw new BadRequestException("Email is missing");
        
        return email;        
})

export const Password = createParamDecorator((data, req: Request) => {
        const password: string | undefined = req.body.password;

        if (!password)
                throw new BadRequestException("Password is missing");
        
        return password;
});
