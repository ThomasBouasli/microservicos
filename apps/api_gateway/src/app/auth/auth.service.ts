import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { compare, hash } from "bcrypt";

import { User } from "../infra/entities/user.entity";

import type { RegisterDTO } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly user_repo: Repository<User>,
	) {}

	async validate_user(email: string, password: string) {
		const user = await this.user_repo.findOne({ where: { email } });

		if (user && (await compare(password, user.password))) {
			return user.id;
		}

		throw new Error("Invalid credentials");
	}

	async register(dto: RegisterDTO) {
		const user = this.user_repo.create({
			email: dto.email,
			password: await hash(dto.password, 10),
		});

		await this.user_repo.save(user);
		return user;
	}
}
