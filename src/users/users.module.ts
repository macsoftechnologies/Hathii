import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { order, orderSchema } from './schema/order.schema';

import { SharedService } from 'src/shared/shared.service';
 
@Module({
  imports:[MongooseModule.forFeature([{name:order.name,schema:orderSchema}])],
  controllers: [UsersController],
  providers: [UsersService, SharedService]
})
export class UsersModule {}
