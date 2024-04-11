import { Module } from "@nestjs/common";
import { InfraModule } from "./infra/infra.module";
import { ProductsModule } from "./products/products.module";

@Module({
	imports: [InfraModule, ProductsModule],
})
export class AppModule {}
