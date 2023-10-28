import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../../entity/product.entity";
import { ProductServiceImp } from "../../service/impl/product-service-impl.service";

describe('ProductService', () => {
    let productService: ProductServiceImp
    let productRepository: Repository<ProductEntity>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductServiceImp,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: {},
                },
            ],
            // controllers: [ProductController]
        }).compile();

        productService = module.get<ProductServiceImp>(ProductServiceImp);
        productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    });

    it('should be defined', () => {
        expect(ProductServiceImp).toBeDefined();
    });
})