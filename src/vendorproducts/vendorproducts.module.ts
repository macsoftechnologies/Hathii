import { Module } from '@nestjs/common';
import { VendorproductsService } from './vendorproducts.service';
import { VendorproductsController } from './vendorproducts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { vendorproduct, vendorproductSchema } from './schema/vendorproduct.schema';

@Module({
   imports:[MongooseModule.forFeature([{name:vendorproduct.name,schema:vendorproductSchema}])],
  controllers: [VendorproductsController],
  providers: [VendorproductsService]
})
export class VendorproductsModule {}
