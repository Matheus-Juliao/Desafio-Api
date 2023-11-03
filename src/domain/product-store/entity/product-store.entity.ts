import { ProductEntity } from "src/domain/product/entity/product.entity";
import { StoreEntity } from "src/domain/store/entity/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('produtoloja')
export class ProductStoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idProduto' })
  idProduct: number;

  @Column({ name: 'idLoja' })
  idStore: number;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true, name: 'precoVenda' })
  priceSale: number;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: 'idProduct' })
  product: ProductEntity;

  @ManyToOne(() => StoreEntity, { eager: true })
  @JoinColumn({ name: 'idStore' })
  store: StoreEntity;
}