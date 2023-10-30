import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './domain/product/api/v1/product.module';
import { StoreModule } from './domain/store/api/v1/store.module';
import { ProductStoreModule } from './domain/product-store/api/v1/product-store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "VRSoftware",
      synchronize: true, // Somente para desenvolvimento
      entities: [__dirname + '/**/*entity{.js,.ts}'],
    }),
    ProductModule,
    StoreModule,
    ProductStoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
