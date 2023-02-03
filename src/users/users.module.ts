import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { order, orderSchema } from './schema/order.schema';

import { SharedService } from 'src/shared/shared.service';
import { user, UserSchema } from 'src/user/dto/user.schema';
 
@Module({
  imports:[MongooseModule.forFeature([{name:order.name,schema:orderSchema},{name:user.name,schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, SharedService]
})
export class UsersModule {}
