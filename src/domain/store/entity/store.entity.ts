import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('loja')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, name: 'descricao' })
  description: string;
}