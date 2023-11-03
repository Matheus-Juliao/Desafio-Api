import { Controller, Get, Param } from "@nestjs/common";
import { ProductStoreService } from "../../service/product-store.service";

@Controller('/v1/product-store')
export class ProductStoreController {
    constructor(private productStoreService: ProductStoreService) {}

    @Get('/list-store-price-sale/:productId')
    async listStorePriceSale(@Param('productId') productId: number): Promise<any[]> {
        return this.productStoreService.listStorePriceSale(productId);
    }
}