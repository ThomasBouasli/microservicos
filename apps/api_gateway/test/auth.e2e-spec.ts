import { Test, type TestingModule } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app/app.module";
import type { Repository } from "typeorm";
import type { User } from "@/app/infra/entities/user.entity";
import { hash } from "bcrypt";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let user_repository: Repository<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    user_repository = moduleFixture.get("UserRepository");

    await app.init();
  });

  describe("POST /auth/sign-up", () => {
    it("should sign up a new user", () => {
      return request(app.getHttpServer())
        .post("/auth/sign-up")
        .send({ email: "test@test.com", password: "123456" })
        .expect((res) => {
          expect(res.status).toBe(201);
          expect(res.headers["set-cookie"]).toBeDefined();
        });
    });

    it.todo("should not sign up a user with an existing email");
  });

  describe("POST /auth/sign-in", () => {
    const user_data = {
      email: "test@test.com",
      password: "123456",
    };

    beforeEach(async () => {
      const user = user_repository.create({
        email: user_data.email,
        password: await hash(user_data.password, 10),
      });

      await user_repository.save(user);
    });

    it("should sign in a user", () => {
      return request(app.getHttpServer())
        .post("/auth/sign-in")
        .send(user_data)
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(res.headers["set-cookie"]).toBeDefined();
        });
    });

    it.todo("should not sign in a user with invalid credentials");
  });
});
