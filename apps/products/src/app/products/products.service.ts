import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
import { Product } from "../infra/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>
	) {}

	async create(product: CreateProductDto) {
		return await this.productRepository.save(product);
	}

	async findAll() {
		return await this.productRepository.find();
	}

	async findOneById(id: number) {
		return await this.productRepository.findOneBy({ id });
	}

	async updateById(id: number, product: UpdateProductDto) {
		return await this.productRepository.update({ id }, product);
	}

	async deleteById(id: number) {
		return await this.productRepository.delete({ id });
	}
}
