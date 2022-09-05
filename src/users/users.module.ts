import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { order, orderSchema } from './schema/order.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:order.name,schema:orderSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
