import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorsModule } from './vendors/vendors.module';
import { RatingModule } from './rating/rating.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/eCommerce?retryWrites=true&w=majority'),
  UsersModule, AdminModule,   ServicesModule,VendorsModule, ServicesModule, RatingModule, ServiceproviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
