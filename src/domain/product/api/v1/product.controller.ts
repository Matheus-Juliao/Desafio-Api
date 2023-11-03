import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Response } from "@nestjs/common";
import { ProductService } from "../../service/product-service";
import { ProductRequest } from "./request/product-request";
import { ProductEntity } from "../../entity/product.entity";
import { Messages } from "src/config/messages/messages";

@Controller('v1/product')
export class ProductController {
    constructor(private produtoService: ProductService) {}

    @Post()
    async create(@Body() productRequest: ProductRequest, @Response() res): Promise<Messages> {
        return res.status(HttpStatus.CREATED).send(await this.produtoService.create(productRequest)); ;
    }

    @Get()
    async list(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort') sort: string = 'id:asc'): Promise<{ data: ProductEntity[]; total: number; page: number; limit: number }> {
            return this.produtoService.get(page, limit, sort);
    }

    @Put('/:productId')
    async update(@Param('productId') productId: number, @Body() productRequest: ProductRequest): Promise<Messages>{
        return this.produtoService.update(productId, productRequest);
    }

    @Delete('/:productId')
    async delete(@Param('productId') productId: number): Promise<Messages> {
        return this.produtoService.delete(productId);
    }
}