import { Module } from '@nestjs/common';
import { ServiceproviderService } from './serviceprovider.service';
import { ServiceproviderController } from './serviceprovider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { serviceProv, serviceProvSchema } from './Schema/serviceprovider.schema';
import { providerlogin, providerloginSchema } from './Schema/providerlogin.schema';
 
@Module({
  imports:[MongooseModule.forFeature([{name:serviceProv.name,schema:serviceProvSchema}]),
           MongooseModule.forFeature([{name:providerlogin.name,schema:providerloginSchema}])],
  controllers: [ServiceproviderController],
  providers: [ServiceproviderService]
})
export class ServiceproviderModule {}
