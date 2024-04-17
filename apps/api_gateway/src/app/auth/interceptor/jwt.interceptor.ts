import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import { type Observable, map } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";

@Injectable()
export class JWTInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<{ id: string }>
  ): Observable<void> {
    return next.handle().pipe(
      map((user) => {
        const response = context.switchToHttp().getResponse<Response>();

        const token = this.jwtService.sign({
          sub: user.id,
        });

        response.cookie("token", token, {
          httpOnly: true,
          signed: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
        });

        return;
      })
    );
  }
}
