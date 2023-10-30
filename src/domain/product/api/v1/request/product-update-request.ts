import { IsNumber } from "class-validator";
import { IsImageValid } from "src/config/validation/is-image-valid";

export class ProductUpdateRequest {
    @IsNumber()
    id: number
    description: string;
    @IsNumber()
    cost: number;
    @IsImageValid()
    image: Buffer
}