import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './rating/rating.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/hathii?retryWrites=true&w=majority'),
  UsersModule, AdminModule,   ServicesModule, ServicesModule, RatingModule, ServiceproviderModule,VendorsModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
