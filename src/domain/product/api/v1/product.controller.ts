import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "../../service/product-service";
import { ProductRequest } from "./request/product-request";
import { ProductResponse } from "./response/product-response";
import { ProductEntity } from "../../entity/product.entity";
import { ProductUpdateRequest } from "./request/product-update-request";
import { Messages } from "src/config/messages/messages";

@Controller('v1/product')
export class ProductController {
    constructor(private produtoService: ProductService) {}

    @Post()
    async create(@Body() productRequest: ProductRequest): Promise<ProductResponse> {
        return this.produtoService.create(productRequest);
    }

    @Get()
    async list(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort') sort: string = 'id:asc'): Promise<{ data: ProductEntity[]; total: number; page: number; limit: number }> {
            return this.produtoService.get(page, limit, sort);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() productUpdateRequest: ProductUpdateRequest): Promise<ProductResponse>{
        return this.produtoService.update(id, productUpdateRequest);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<Messages> {
        return this.produtoService.delete(id);
    }

    @Get('/:productId')
    async listStorePriceSale(@Param('productId') productId: number): Promise<any[]> {
        return this.produtoService.listStorePriceSale(productId);
    }
}