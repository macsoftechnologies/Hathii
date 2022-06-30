import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { vendorDto } from "./Dto/venders.dto";
import {   VendorsService } from "./vendors.service";

@Controller('vendor')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}
 
 
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


@Post('removeVendor')
async vendDelete(@Body() req:vendorDto){
    try{
        const result=await this.vendorsService.deleteVen(req)
        return result

    }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
        }
    }
}
 

@Post('updateVendor')
async venUpdate(@Body()req:vendorDto){
    try{
   const edit =await this.vendorsService.upadateVen(req)
   return edit
    }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
        }
    }
}
}