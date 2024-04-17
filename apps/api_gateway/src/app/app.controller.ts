import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Observable, firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";

@Controller("profile")
export class ProfileController {
  constructor(private readonly http: HttpService) {}

  @Post("initialize/:id")
  initialize(
    @Param("id") id: string,
    @Body() dto: unknown
  ): Observable<AxiosResponse<unknown>> {
    return this.http.post(`http://localhost:3001/initialize/${id}`, dto);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const response = this.http.get(`http://localhost:3001/profile/${id}`);

    const res = await firstValueFrom(response);

    console.log(res.data);
  }
}
