import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { admin, adminSchema } from './Schema/admin.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:admin.name ,schema:adminSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
