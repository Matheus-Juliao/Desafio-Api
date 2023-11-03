import { ProductStoreEntity } from "src/domain/product-store/entity/product-store.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('loja')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, name: 'descricao' })
  description: string;

  @OneToMany(() => ProductStoreEntity, productStore => productStore.store)
  stores: ProductStoreEntity[];
}