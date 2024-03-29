import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from './schema/category.schema';
import { Subcategory, subcategorySchema } from './schema/subcategory.schema';
import { vendorproduct, vendorproductSchema } from 'src/vendorproducts/schema/vendorproduct.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Category.name, schema: categorySchema}]),
            MongooseModule.forFeature([{name: Subcategory.name, schema: subcategorySchema}, 
              {name: vendorproduct.name,schema: vendorproductSchema}])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
