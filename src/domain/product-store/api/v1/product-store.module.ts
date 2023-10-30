import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductStoreEntity } from "../../entity/product-store.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductStoreEntity])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule.forFeature([ProductStoreEntity])]
})

export class ProductStoreModule {}