import { Injectable, NotFoundException } from "@nestjs/common";
import { StoreEntity } from "src/domain/store/entity/store.entity";
import { DataSource, Repository } from "typeorm";
import { ProductStoreEntity } from "../entity/product-store.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductStoreResponse } from "../api/v1/response/product-store-response";
import { ProductStoreRequest } from "../api/v1/request/product-store-request";

@Injectable()
export class ProductStoreService {
  constructor(
      @InjectRepository(ProductStoreEntity)
      private dataSource: DataSource
  ) {}
    
  async listStorePriceSale(productId: number): Promise<any[]> {
    return await this.dataSource
      .getRepository(StoreEntity)
      .createQueryBuilder('l')
      .select(['pl.id, l.id as idStore', 'l.description as description', 'pl.priceSale as priceSale'])
      .innerJoin('produtoloja', 'pl', 'l.id = pl.idStore')
      .where('pl.idProduct = :productId', { productId })
      .getRawMany();
  }
}