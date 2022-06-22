import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { vendorDto } from "./Dto/venders.dto";
import {   VendorsService } from "./vendors.service";

@Controller('vendor')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post('Vendors')
  async createVen(@Body() req:vendorDto){
    try{
        const Ven=await this.vendorsService.createVendor(req)
        return Ven
    }catch(error){
        return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        };
     }
}


@Get('GetVendors')
async listVendors(){
    try{
        const result=await this.vendorsService.getVendor()
        return result

    }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            message:error.message
            
        }
    }
}
}