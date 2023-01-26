import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingModule } from './rating/rating.module';
import { VendorproductsModule } from './vendorproducts/vendorproducts.module';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/hathii?retryWrites=true&w=majority'),
 
   AdminModule, RatingModule,  VendorproductsModule,   CategoryModule, ChatModule,UserModule,UsersModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
