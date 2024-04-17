import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database/db.sqlite",
      entities: [User],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule],
})
export class InfraModule {}
