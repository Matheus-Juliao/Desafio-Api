import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StoreService } from "./store.service";
import { StoreEntity } from "../entity/store.entity";


describe('StoreService', () => {
    let storeService: StoreService
    let storeRepository: Repository<StoreEntity>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StoreService,
                {
                    provide: getRepositoryToken(StoreEntity),
                    useClass: Repository
                },
            ]
        }).compile();

        storeService = module.get<StoreService>(StoreService);
        storeRepository = module.get<Repository<StoreEntity>>(getRepositoryToken(StoreEntity));
    });

    it('should be defined', () => {
        expect(StoreService).toBeDefined();
    });

    it('should be list', async () => {
        const mockStores = [
            {'id': 1, 'description': 'Loja 1'},
            {'id': 2, 'description': 'Loja 2'},
            {'id': 3, 'description': 'Loja 3'}
        ]

        const spy = jest.spyOn(storeRepository, 'find').mockResolvedValue(mockStores)
        const result = await storeService.list();

        expect(spy).toHaveBeenCalled();
        expect(result).toEqual(mockStores);
    });
})