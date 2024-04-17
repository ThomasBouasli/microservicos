import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  Get,
} from "@nestjs/common";
import type { Request as RequestType } from "express";
import { AuthService } from "./auth.service";
import type { RegisterDTO } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { ApiTags } from "@nestjs/swagger";
import { JWTInterceptor } from "./interceptor/jwt.interceptor";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(JWTInterceptor)
  async login(@Request() req: RequestType) {
    return req.user;
  }

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(JWTInterceptor)
  async register(@Body() dto: RegisterDTO) {
    return this.auth_service.register(dto);
  }

  @Get("me")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: RequestType) {
    return req.user;
  }
}
