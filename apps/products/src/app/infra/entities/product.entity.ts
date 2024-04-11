import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column("varchar")
	name: string;

	@Column("varchar")
	weight: string;

	@Column("varchar")
	flavor: string;

	@Column("double precision")
	price: number;

	@Column("int")
	quantity: number;
}
