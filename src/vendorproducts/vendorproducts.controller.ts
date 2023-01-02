import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody,  ApiPayloadTooLargeResponse,  ApiTags } from '@nestjs/swagger';
import { inventoryManagementDto } from './dto/inventoryManangement.dto';
import { vendorproductDto } from './dto/vendorproduct.dto';
import { VendorproductsService } from './vendorproducts.service';

@Controller('vendorproducts')
export class VendorproductsController {
  constructor(private readonly vendorproductsService: VendorproductsService) {}


  @ApiTags('vendorproducts')
  @ApiBody({
    type:vendorproductDto
  })
  @Post('/createVendorProduct')
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
  @Get('/getVendorProduct')
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
      const result=await this.vendorproductsService.editvendProd(req)
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
    type: vendorproductDto
  })
  @Post('/inventory')
  async inventoryAPI(@Body() req: vendorproductDto) {
    try{
      const invent = await this.vendorproductsService.inventoryApi(req);
      if(invent) {
        return invent;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: vendorproductDto
  })
  @Post('/addinventorymanagement')
  async addinventManagement(@Body() req: inventoryManagementDto) {
    try{
      const addinvent = await this.vendorproductsService.addInventManagement(req);
      return addinvent;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: inventoryManagementDto
  })
  @Get('/getinventory')
  async getinventory() {
    try{
      const getem = await this.vendorproductsService.getInventory();
      return getem;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: vendorproductDto
  })
  @Post('/inventorymanagement')
  async inventoryManagement(@Body() req: inventoryManagementDto){
    try{
      const inventorymanagement = await this.vendorproductsService.inventoryManage(req);
      return inventorymanagement;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: vendorproductDto
  })
  @Post('/stockalert')
  async stockAlert(@Body() req: vendorproductDto) {
    try{
      const stock = await this.vendorproductsService.stockalert(req);
      return stock
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: vendorproductDto
  })
  @Post('/searchProductbypriceandshoptype')
  async searchProductByPriceandShop(@Body() req: vendorproductDto) {
    try{
      const search = await this.vendorproductsService.searchProductsByPriceandShop(req);
      return search;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: vendorproductDto
  })
  @Post('/searchbycategory')
  async searchByCategory(@Body() req: vendorproductDto) {
    try{
      const search = await this.vendorproductsService.searchProductByCategory(req);
      return search;
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }
}
