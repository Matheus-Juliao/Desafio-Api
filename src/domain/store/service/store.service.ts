import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreEntity } from "../entity/store.entity";
import { Repository } from "typeorm";

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(StoreEntity)
        private storeRepository: Repository<StoreEntity>
    ) {}

    async list(): Promise<StoreEntity[]> {
        return this.storeRepository.find();
    }
}