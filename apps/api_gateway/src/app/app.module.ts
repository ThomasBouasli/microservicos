import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { InfraModule } from "./infra/infra.module";

@Module({
	imports: [InfraModule, AuthModule],
})
export class AppModule {}
