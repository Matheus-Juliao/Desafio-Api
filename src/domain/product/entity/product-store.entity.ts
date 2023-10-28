import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StoreEntity } from "src/domain/store/entity/store.entity";
import { ProductEntity } from "./product.entity";

@Entity('produtoloja')
export class ProductStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idProduto' })
  idProduct: number;

  @Column({ name: 'idLoja' })
  idStore: number;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true, name: 'precoVenda' })
  sellingPrice: number;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: 'idProduct' })
  product: ProductEntity;

  @ManyToOne(() => StoreEntity, { eager: true })
  @JoinColumn({ name: 'idStore' })
  store: StoreEntity;
}