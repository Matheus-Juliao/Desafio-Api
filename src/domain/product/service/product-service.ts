import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "../entity/product.entity";
import { DataSource, Repository } from "typeorm";
import { ProductRequest } from "../api/v1/request/product-request";
import { Messages } from "src/config/messages/messages";
import { ProductStoreEntity } from "src/domain/product-store/entity/product-store.entity";
import { StoreModel } from "src/domain/store/model/store.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly produtcRepository: Repository<ProductEntity>,
    private dataSource: DataSource
  ) {}

  async create(productRequest: ProductRequest): Promise<Messages> {
    const product = {
      description: productRequest.description,
      cost: productRequest.cost,
      image: productRequest.image ? Buffer.from(productRequest.image, 'base64') : null
    }

    return await this.dataSource.transaction(async manager => {
      const responseProduct = await manager.save(ProductEntity, product);
      const seenIds = new Set();

      for(const store of productRequest.stores) {
        if(seenIds.has(store.id)) {
          throw new BadRequestException('No more than one sale price is allowed for the same store');
        }
        seenIds.add(store.id);

        const productStore = this.newProductStore(responseProduct.id, store);
        await manager.save(productStore)
      }

      return new Messages(HttpStatus.CREATED.valueOf(), "Product saved successfully");
    })
  }

  async get(page: number, limit: number, sort: string): Promise<{ data: ProductEntity[]; total: number; page: number; limit: number }> {
    const [column, order] = sort.split(':');
    const [data, total] = await this.produtcRepository.findAndCount({
      select: ["id", "description", "cost"],
      skip: (page - 1) * limit,
      order: { [column]: order }
    });
  
    return {
      data: data,
      total: total,
      page: page,
      limit: limit,
    };
  }

  async update(productId: number, productRequest: ProductRequest): Promise<Messages> {
    const product = await this.getProduct(productId);
    const updateProduct = Object.assign(product, productRequest);

    return await this.dataSource.transaction(async manager => {
      await manager.update(ProductEntity, productId, {
        description: updateProduct.description,
        cost: updateProduct.cost,
        image: updateProduct.image,
      })

      const seenIds = new Set();
      const stores = await manager.findBy(ProductStoreEntity, { idProduct: productId });
      
      //Verifica se a loja está presente na request
      for (const s of stores) {
        if (!seenIds.has(s.idStore)) {
          const storeUpdate = productRequest.stores.find(store => store.id === s.idStore);
      
          if (storeUpdate) {
            await manager.update(ProductStoreEntity, s.id, { priceSale: storeUpdate.priceSale });
          } else {
            await manager.delete(ProductStoreEntity, s.id)
          }
      
          seenIds.add(s.idStore);
        }
      }
      
      //Salva as lojas que não estão no update
      for (const storeUpdate of productRequest.stores) {
        if (!seenIds.has(storeUpdate.id)) {
          const productStore = this.newProductStore(productId, storeUpdate);
          await manager.save(ProductStoreEntity, productStore);
        }
      }
      
      return new Messages(HttpStatus.OK.valueOf(), "Product edited successfully")
    });
  }
  
  async delete(productId: number): Promise<Messages> {
    await this.getProduct(productId);

    return await this.dataSource.transaction(async manager => {
      await manager.delete(ProductStoreEntity, { idProduct: productId })
      await manager.delete(ProductEntity, productId);
      
      return new Messages(HttpStatus.OK.valueOf() , 'Product successfully deleted');
    });
  }

  private async getProduct(productId: number): Promise<ProductEntity> {
    const product = await this.produtcRepository.findOneBy({id: productId});

    if(!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  private newProductStore(idProduct: number, store: StoreModel): ProductStoreEntity {
    const productStore = new ProductStoreEntity();
    productStore.idProduct = idProduct;
    productStore.idStore = store.id;
    productStore.priceSale = store.priceSale;

    return productStore;
  }

}