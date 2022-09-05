import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { serviceDto } from './Dto/service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
 
  @ApiTags('services')
  @ApiBody({
    type:serviceDto
  })
  @Post('/service')
  async createservice(@Body() req:serviceDto){
    try{
      const result =await this.servicesService.CreateService(req)
       return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }


  @ApiTags('services')
  @Get('/getService')
  async getservice(){
    try{
      const res=await this.servicesService.getService()
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error


      }
    }
  }


   

  @ApiTags('services')
  @ApiBody({
    type:serviceDto
  })
@Post('/removeService')
async deleteservice(@Body() req:serviceDto){
  try{
    const Del=await this.servicesService.Deleteservice(req)
    return Del

  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      Message:error
    }
  }
}

@ApiTags('services')
  @ApiBody({
    type:serviceDto
  })
  
@Post('/updateService')
async servieProv(@Body() req:serviceDto){
  try{
     const result=await this.servicesService.updateSer(req)
     return result

  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      Message:error
    }
  }
}      



}
