import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/domain/product/entity/product.entity";
import { StoreEntity } from "src/domain/store/entity/store.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ProductStoreService {
  constructor(
      private dataSource: DataSource
  ) {}
    
  async listStorePriceSale(productId: number): Promise<any> {
    const resp = await this.dataSource
      .getRepository(StoreEntity)
      .createQueryBuilder('l')
      .select(['l.id as id', 'l.description as description', 'pl.priceSale as priceSale'])
      .innerJoin('produtoloja', 'pl', 'l.id = pl.idStore')
      .where('pl.idProduct = :productId', { productId })
      .orderBy('l.id')
      .getRawMany();

    const image = await this.dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder('p')
      .select(['p.image'])
      .where('p.id =:productId', {productId})
      .getMany()

    const stores = resp.map(store => {
      store.priceSale = store.pricesale;
      delete store.pricesale;
    
      return store;
    });

    return { image: image, stores: stores }
  }
}