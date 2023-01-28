import { Body, Controller, Get, HttpStatus, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody,  ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { userDto } from 'src/user/dto/user.dto';
import { inventoryManagementDto } from './dto/inventoryManangement.dto';
import { productRequestDto } from './dto/productRequest.dto';
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
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProd(@Body() req:vendorproductDto, @UploadedFiles() image){
    try{
      const res=await this.vendorproductsService.vendorprodcreate(req, image)
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

  @ApiTags('/vendorproducts')
  @Post('/vendorproductsOfVendor')
  async vendorproductsOfVendor(@Body() req: userDto) {
    try {
    const getproducts = await this.vendorproductsService.getvendorproductsofVendor(req);
    return getproducts
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
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
    type: vendorproductDto
  })
  @Post('/getVendorProductById')
  async getVendorProductById(@Body() req: vendorproductDto) {
    try{
      const getProduct = await this.vendorproductsService.getvendorproductbyid(req);
      return getProduct
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }
  
  @ApiTags('vendorproducts')
  @ApiBody({
    type:vendorproductDto
  })
  @Post('/updatevendorProduct')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async editVen(@Body() req:vendorproductDto, @UploadedFiles() image){
    try{
      const result=await this.vendorproductsService.editvendProd(req, image)
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

  @ApiTags('vendorproducts')
  @ApiBody({
    type: productRequestDto
  })
  @Post('/createProductRequest')
  async sendProductRequest(@Body() req: productRequestDto) {
    try{
      const sendRequest = await this.vendorproductsService.sendproductRequest(req);
      return sendRequest
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('vendorproducts')
  @Get('/getProductRequests')
  async getProductRequests() {
    try{
      const sendRequest = await this.vendorproductsService.getproductRequest();
      return sendRequest
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('vendorproducts')
  @Get('/getProductRequest/:productRequestId')
  async getProductRequestById(@Param('productRequestId') productRequestId: string) {
    try{
      const getRequest = await this.vendorproductsService.getProdRequestById(productRequestId);
      return getRequest
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('vendorproducts')
  @ApiBody({
    type: userDto
  })
  @Post('/productrequestsofuser')
  async productrequestsOfUser(@Body() req: userDto) {
    try{
      const prodRequest = await this.vendorproductsService.productRequestsofUser(req);
      return prodRequest
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  // @ApiTags('vendorproducts')
  // @ApiBody({
  //   type: userDto
  // })
  // @Post('/acceptedproductrequests')
  // async acceptedproductrequests(@Body() req: userDto) {
  //   try{
  //     const acceptrequests = await this.vendorproductsService.acceptedRequestsOfVendor(req);
  //     return acceptrequests
  //   } catch(error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     }
  //   }
  // }
}
