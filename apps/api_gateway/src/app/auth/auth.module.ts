import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/passport-strategy";
import { LocalStrategy } from "./strategies/local-strategy";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
