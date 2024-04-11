import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	weight: string;

	@ApiProperty()
	flavor: string;

	@ApiProperty()
	price: number;

	@ApiProperty()
	quantity: number;
}
