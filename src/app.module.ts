import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: `mongodb+srv://service:${process.env.}@cluster0-e0cg8.mongodb.net/test?retryWrites=true&w=majority`
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
