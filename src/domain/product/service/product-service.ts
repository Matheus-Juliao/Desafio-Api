import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../entity/product.entity";
import { DataSource, Repository } from "typeorm";
import { ProductRequest } from "../api/v1/request/product-request";
import { ProductResponse } from "../api/v1/response/product-response";
import { ProductUpdateRequest } from "../api/v1/request/product-update-request";
import { Messages } from "src/config/messages/messages";
import { ProductStoreEntity } from "src/domain/product-store/entity/product-store.entity";
import { StoreEntity } from "src/domain/store/entity/store.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly produtcRepository: Repository<ProductEntity>,
    @InjectRepository(ProductStoreEntity)
    private readonly productStoreEntity: Repository<ProductStoreEntity>,
    private dataSource: DataSource
  ) {}

  async create(productRequest: ProductRequest): Promise<ProductResponse> {
    const product = {
      description: productRequest.description,
      cost: productRequest.cost,
      image: productRequest.image
    }

    return await this.dataSource.transaction(async manager => {
      const responseProduct = await manager.save(this.produtcRepository.create(product));

      for(const store of productRequest.stores) {
        const productStore = new ProductStoreEntity();
        productStore.idProduct = responseProduct.id;
        productStore.idStore = store.id;
        productStore.priceSale = store.priceSale;

        await manager.save(this.productStoreEntity.create(productStore))
      }

      return new ProductResponse(responseProduct);
    })
  }

  async get(page: number, limit: number, sort: string): Promise<{ data: ProductEntity[]; total: number; page: number; limit: number }> {
    const [column, order] = sort.split(':');
    const [data, total] = await this.produtcRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { [column]: order }
    })

    return {
      data: data,
      total: total,
      page: page,
      limit: limit,
    };
  }

  async update(id: number, productUpdateRequest: ProductUpdateRequest): Promise<ProductResponse> {
    const product = await this.produtcRepository.findOneBy({id: id});

    if(!product) {
      throw new NotFoundException('Product not found');
    }
    const updateProduct = Object.assign(product, productUpdateRequest);

    return await this.dataSource.transaction(async manager => {
      await manager.save(updateProduct);

      return new ProductResponse(updateProduct);
    });
  }
  
  async delete(id: number): Promise<Messages> {
    const product = await this.produtcRepository.findOneBy({id: id});

    if(!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.dataSource.transaction(async manager => {
      await manager.delete(ProductEntity, id);

      return new Messages(HttpStatus.OK.valueOf() , "Product successfully deleted");
    });
  }

  async listStorePriceSale(productId: number): Promise<any[]> {
    return await this.dataSource
    .getRepository(StoreEntity)
    .createQueryBuilder('l')
    .select(['l.id as id', 'l.description as description', 'pl.priceSale as priceSale'])
    .innerJoin('produtoloja', 'pl', 'l.id = pl.idStore')
    .where('pl.idProduct = :productId', { productId })
    .getRawMany();
  }

}