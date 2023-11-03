import { ProductStoreEntity } from "src/domain/product-store/entity/product-store.entity";

export class ProductStoreResponse {
    private id: number;
    private idProduct: number;
    private idStore: number;
    private priceSale: number;

    constructor(productStoreEntity: ProductStoreEntity) {
        this.id = productStoreEntity.id;
        this.idProduct = productStoreEntity.idProduct
        this.idStore = productStoreEntity.idStore
        this.priceSale = productStoreEntity.priceSale;
    }
}