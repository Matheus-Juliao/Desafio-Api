import { Body, Controller, Post } from "@nestjs/common";
import { ProductService } from "../../service/impl/product-service";
import { ProductRequest } from "./request/product-request";
import { ProductResponse } from "./response/product-response";

@Controller('v1/product')
export class ProductController {
    constructor(private produtoService: ProductService) {}

    @Post()
    async create(@Body() productRequest: ProductRequest): Promise<ProductResponse> {
        return this.produtoService.create(productRequest);
    }
}