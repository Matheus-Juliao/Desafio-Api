import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../entity/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "../../service/product-service";
import { ProductStoreModule } from "src/domain/product-store/api/v1/product-store.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), ProductStoreModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule {} 