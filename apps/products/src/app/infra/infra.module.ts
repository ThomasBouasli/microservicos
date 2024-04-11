import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { Product } from "./entities/product.entity";

config();

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: "postgres",
				port: parseInt(process.env.DATABASE_PORT),
				username: process.env.DATABASE_USERNAME,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				synchronize: true,
				dropSchema: true,
				entities: [Product],
			}),
		}),
		TypeOrmModule.forFeature([Product]),
	],
	exports: [TypeOrmModule],
})
export class InfraModule {}
