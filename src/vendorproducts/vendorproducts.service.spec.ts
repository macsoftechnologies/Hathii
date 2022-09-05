import { Test, TestingModule } from '@nestjs/testing';
import { VendorproductsService } from './vendorproducts.service';

describe('VendorproductsService', () => {
  let service: VendorproductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorproductsService],
    }).compile();

    service = module.get<VendorproductsService>(VendorproductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
