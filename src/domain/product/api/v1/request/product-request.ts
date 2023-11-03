import { IsArray, IsNotEmpty, IsNumber, ArrayMinSize } from "class-validator";
import { IsImageValid } from "src/config/validation/is-image-valid";
import { StoreModel } from "src/domain/store/model/store.model";

export class ProductRequest {
    @IsNotEmpty()
    description: string;

    cost: number;

    @IsImageValid({ message: "Only images in .png and .jpg format are allowed" })
    image: Buffer;

    @IsArray()
    @ArrayMinSize(1)
    stores: StoreModel[]
}