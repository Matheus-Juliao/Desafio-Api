import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductStoreEntity } from "../../entity/product-store.entity";
import { ProductStoreController } from "./product-store.controller";
import { ProductStoreService } from "../../service/product-store.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductStoreEntity])],
    controllers: [ProductStoreController],
    providers: [ProductStoreService],
    exports: [TypeOrmModule.forFeature([ProductStoreEntity])]
})

export class ProductStoreModule {}