import { Controller, Post, Body } from "@nestjs/common"


@Controller()
export class AppController {
        constructor() { }


        @Post("/debug")
        debug(@Body() body: any) {
                console.log(body);
        }
}