import { Test, TestingModule } from '@nestjs/testing';
import { VendorproductsController } from './vendorproducts.controller';
import { VendorproductsService } from './vendorproducts.service';

describe('VendorproductsController', () => {
  let controller: VendorproductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorproductsController],
      providers: [VendorproductsService],
    }).compile();

    controller = module.get<VendorproductsController>(VendorproductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
