import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { serviceProvDto } from './Dto/serviceprovider.dto';
import { ServiceproviderService } from './serviceprovider.service';

@Controller('serviceprovider')
export class ServiceproviderController {
  constructor(private readonly serviceproviderService: ServiceproviderService) {}

   

  @Post('addServiceProvider')
  async createservice(@Body() req:serviceProvDto){
    try{
      const result =await this.serviceproviderService.CreateServiceProv(req)
      console.log("result", result);
       return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error.message,
      }
    }
  }


      

     @Get('getServicerProviders')
     async providerSer(){
      try{

        const result=await this.serviceproviderService.getProvider()
        return result

       }catch(error){

         return{
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          Message:error
         }
      }
    
    }


  
     @Post('getprovider/:id')
     async getRes(@Param('id')id:string){
      try{

        const result=await this.serviceproviderService.ProviderById(id)
        return result 
      }catch(error){
        return{

          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          Message:error
  
        }
      }
     }
 
   
      @Post('UpdateserviceProvider')
      async servieProv(@Body() req:serviceProvDto){
        try{
           const result=await this.serviceproviderService.updateProv(req)
           return result

        }catch(error){
          return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
          }
        }
      }      
    

      @Post('removeServieProvider')
      async removeser(@Body() req:serviceProvDto){

        try{

          const result=await this.serviceproviderService.deleteProv(req)
          return result

        }catch(error){
          return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error

          }
        }
      }
}
