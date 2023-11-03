import { ProductStoreEntity } from "src/domain/product-store/entity/product-store.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('produto')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 60, name: 'descricao' })
    description: string

    @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true, name: 'custo' })
    cost: number;
  
    @Column({ type: 'bytea', nullable: true, name: 'imagem' })
    image: Buffer;

    @OneToMany(() => ProductStoreEntity, productStore => productStore.product)
    products: ProductStoreEntity[]; 
}