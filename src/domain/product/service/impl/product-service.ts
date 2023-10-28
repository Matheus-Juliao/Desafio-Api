import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../../entity/product.entity";
import { Repository } from "typeorm";
import { ProductRequest } from "../../api/v1/request/product-request";
import { ProductResponse } from "../../api/v1/response/product-response";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private produtcRepository: Repository<ProductEntity>
  ) {}

  async create(productRequest: ProductRequest): Promise<ProductResponse> {
    return this.produtcRepository.save(productRequest);
  }

}