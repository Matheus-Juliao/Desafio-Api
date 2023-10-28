import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../entity/product.entity";
// import { ProductServiceImp } from "../../service/impl/product-service-impl.service";
import { ProductController } from "./product.controller";
import { ProductService } from "../../service/impl/product-service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}