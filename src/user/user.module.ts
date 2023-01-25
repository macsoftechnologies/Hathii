import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { user, UserSchema } from './dto/user.schema';
 

@Module({
  imports:[MongooseModule.forFeature([{name:user.name,schema:UserSchema} ])],
  controllers: [UserController],
  providers: [UserService,AuthService, JwtService,SharedService]
})
export class UserModule {}
