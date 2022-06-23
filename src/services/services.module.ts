import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { service, serviceSchema } from './Schema/service.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:service.name,schema:serviceSchema}])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
