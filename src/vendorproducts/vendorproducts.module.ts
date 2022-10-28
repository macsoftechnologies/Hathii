import { Module } from '@nestjs/common';
import { VendorproductsService } from './vendorproducts.service';
import { VendorproductsController } from './vendorproducts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { vendorproduct, vendorproductSchema } from './schema/vendorproduct.schema';
import { inventoryManagement, inventoryManagementSchema } from './schema/inventoryManagemement.schema';

@Module({
   imports:[MongooseModule.forFeature([{name:vendorproduct.name,schema:vendorproductSchema},
    {name: inventoryManagement.name,schema: inventoryManagementSchema}])],
  controllers: [VendorproductsController],
  providers: [VendorproductsService]
})
export class VendorproductsModule {}
