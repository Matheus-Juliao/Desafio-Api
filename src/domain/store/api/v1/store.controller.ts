import { Controller, Get } from "@nestjs/common";
import { StoreService } from "../../service/store.service";
import { StoreEntity } from "../../entity/store.entity";

@Controller('/v1/store')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Get()
    async list(): Promise<StoreEntity[]> {
        return this.storeService.list(); 
    }
}