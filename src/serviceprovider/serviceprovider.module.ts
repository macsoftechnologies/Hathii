import { Module } from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';
import { ServiceproviderController } from './serviceprovider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { serviceProv, serviceProvSchema } from './Schema/serviceprovider.schema';
 
@Module({
  imports:[MongooseModule.forFeature([{name:serviceProv.name,schema:serviceProvSchema} ])],
  controllers: [ServiceproviderController],
  providers: [ServiceproviderService]
})
export class ServiceproviderModule {}
