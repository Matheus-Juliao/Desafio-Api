import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductStoreRequest {
    @IsNumber()
    @IsNotEmpty()
    idStore: number

    @IsNumber()
    @IsNotEmpty()
    idProduct: number

    @IsNumber()
    @IsNotEmpty()
    priceSale: number
}