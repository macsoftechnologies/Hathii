import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './rating/rating.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { VendorsModule } from './vendors/vendors.module';
import { VendorproductsModule } from './vendorproducts/vendorproducts.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/hathii?retryWrites=true&w=majority'),
 
   AdminModule,   ServicesModule, ServicesModule, RatingModule, ServiceproviderModule,VendorsModule, VendorproductsModule, UsersModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
