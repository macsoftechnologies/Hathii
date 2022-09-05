import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody,  ApiTags } from '@nestjs/swagger';
import { vendorproductDto } from './dto/vendorproduct.dto';
import { VendorproductsService } from './vendorproducts.service';

@Controller('vendorproducts')
export class VendorproductsController {
  constructor(private readonly vendorproductsService: VendorproductsService) {}


  @ApiTags('vendorproducts')
  @ApiBody({
    type:vendorproductDto
  })
  @Post('/createVendorProd')
  async createProd(@Body() req:vendorproductDto){
    try{
      const res=await this.vendorproductsService.vendorprodcreate(req)
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }

  
  @ApiTags('vendorproducts')
  @Get('/getVenProd')
  async vendprodVen(){
    try{
      const result =await this.vendorproductsService.getVenProd()
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type:vendorproductDto
  })
  @Post('/deletevendorPorduct')
  async prodDel(@Body() req:vendorproductDto){
    try{
      const resProd=await this.vendorproductsService.deleteProd(req)
      return resProd
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }

  
  @ApiTags('vendorproducts')
  @ApiBody({
    type:vendorproductDto
  })
  @Post('/updatevendorProduct')
  async editVen(@Body() req:vendorproductDto){
    try{
      const result=await this.vendorproductsService.deleteProd(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }
}
