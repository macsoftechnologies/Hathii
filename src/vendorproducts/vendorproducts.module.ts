import { Module } from '@nestjs/common';
import { VendorproductsService } from './vendorproducts.service';
import { VendorproductsController } from './vendorproducts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { vendorproduct, vendorproductSchema } from './schema/vendorproduct.schema';
import { inventoryManagement, inventoryManagementSchema } from './schema/inventoryManagemement.schema';
import { ProductRequest, productRequestSchema } from './schema/productRequest.schema';
import { user, UserSchema } from 'src/user/dto/user.schema';
import { Category, categorySchema } from 'src/category/schema/category.schema';

@Module({
   imports:[MongooseModule.forFeature([
    {name:vendorproduct.name,schema:vendorproductSchema},
    {name: inventoryManagement.name,schema: inventoryManagementSchema},
    {name: ProductRequest.name,schema: productRequestSchema},
    {name: user.name,schema: UserSchema},
    {name: Category.name,schema: categorySchema},
  ])],
  controllers: [VendorproductsController],
  providers: [VendorproductsService]
})
export class VendorproductsModule {}
