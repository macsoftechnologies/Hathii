import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/eCommerce?retryWrites=true&w=majority'),
  UsersModule, AdminModule, ProductsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
