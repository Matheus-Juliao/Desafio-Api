import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity } from "../../entity/store.entity";
import { StoreController } from "./store.controller";
import { StoreService } from "../../service/store.service";


@Module({
    imports: [TypeOrmModule.forFeature([StoreEntity])],
    controllers: [StoreController],
    providers: [StoreService],
    exports: [StoreService]
})
export class StoreModule {}