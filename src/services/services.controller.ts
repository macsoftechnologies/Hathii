import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { serviceDto } from './Dto/service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('service')
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



  @Get('getService')
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


   @Post('updateService')
   async  editservice(@Body()req:serviceDto){
    try{
      const result=await this.servicesService.updateService(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
   }
     

 
@Post('removeService')
async deleteservice(@Body()req:serviceDto){
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
}
