import { ProductEntity } from "src/domain/product/entity/product.entity";

export class ProductResponse {
    private id: number;
    private description: string
    private cost: number
    private image: Buffer

    constructor(productEntity: ProductEntity) {
        this.id = productEntity.id;
        this.description = productEntity.description; 
        this.cost = productEntity.cost
        this.image = productEntity.image
    }
}