import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	HttpException,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll() {
		return this.productsService.findAll();
	}

	@Get(":id")
	@HttpCode(HttpStatus.OK)
	async findOne(@Param("id") id: string) {
		return await this.productsService.findOneById(parseInt(id));
	}

	@Patch(":id")
	@HttpCode(HttpStatus.OK)
	async update(
		@Param("id") id: string,
		@Body() updateProductDto: UpdateProductDto
	) {
		const updatedProduct: UpdateResult = await this.productsService.updateById(
			parseInt(id),
			updateProductDto
		);
		if (updatedProduct.affected != 0) {
			const product = await this.productsService.findOneById(parseInt(id));
			return {
				message: "product updated",
				product,
			};
		} else {
			throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@HttpCode(HttpStatus.OK)
	async remove(@Param("id") id: string) {
		const product: DeleteResult = await this.productsService.deleteById(
			parseInt(id)
		);
		if (product.affected != 0) {
			return {
				message: "product deleted",
			};
		} else {
			throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
		}
	}
}
