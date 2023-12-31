import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entity/product.entity";
import { ProductService } from "./product-service";

describe('ProductService', () => {
    let productService: ProductService
    let productRepository: Repository<ProductEntity>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: {},
                },
            ],
            // controllers: [ProductController]
        }).compile();

        productService = module.get<ProductService>(ProductService);
        productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    });

    it('should be defined', () => {
        expect(ProductService).toBeDefined();
    });
})