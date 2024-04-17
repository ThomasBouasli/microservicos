import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "./auth/auth.module";
import { InfraModule } from "./infra/infra.module";
import { ProfileController } from "./app.controller";

@Module({
  imports: [HttpModule, InfraModule, AuthModule],
  controllers: [ProfileController],
})
export class AppModule {}
