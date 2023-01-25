import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
//import { JwtModule } from '@nestjs/jwt';
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from './constants';
//import { JwtStrategy } from './jwt.strategy';
 
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5y' },
    }),
  ],
  //controllers: [AuthService,JwtStrategy],
  providers: [AuthService]
})
export class AuthModule {}