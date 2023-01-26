import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { user, UserSchema } from './dto/user.schema';
 

@Module({
  imports:[MongooseModule.forFeature([{name:user.name,schema:UserSchema} ])],
  controllers: [UserController],
  providers: [UserService, SharedService]
})
export class UserModule {}
