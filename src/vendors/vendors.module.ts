import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { vendor, vendorSchema } from "./Schema/venders.schema";
import { VendorsController } from "./vendors.controller";
import { VendorsService } from "./vendors.service";
 

@Module({
    imports: [MongooseModule.forFeature([{name:vendor.name,schema:vendorSchema}])],
    controllers: [VendorsController],
    providers: [VendorsService],
  })
  export class VendorsModule {}