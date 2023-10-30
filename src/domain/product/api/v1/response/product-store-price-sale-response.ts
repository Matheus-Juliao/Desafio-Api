import { ProductStoreModel } from "src/domain/product/model/product-store.model";

export class ProductStorePriceSaleResponse {
    private id: number;
    private description: string;
    private priceSale: number

    constructor(productStoreModel: ProductStoreModel) {
        this.id = productStoreModel.id,
        this.description = productStoreModel.description
        this.priceSale = productStoreModel.priceSale
    }

}