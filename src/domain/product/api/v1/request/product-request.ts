import { IsNotEmpty, IsNumber } from "class-validator";
import { IsImageValid } from "src/config/validation/is-image-valid";

export class ProductRequest {
    @IsNotEmpty()
    description: string;
    @IsNumber()
    cost: number;
    @IsImageValid()
    image: Buffer
}