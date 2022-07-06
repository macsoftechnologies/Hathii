import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { providerloginDto } from './Dto/providerlogin.dto';
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



      // service provder login 


      
  // @Post('/register')
  // async create(@Body() req:providerloginDto) {
  //     try {
  //         const result = await this.serviceproviderService.Create(req)
  //         console.log("result", result);
  //         return result
  //     } catch (error) {
  //         return {
  //             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //             message: error.message
  //         };
  //     }

  // }
  
  // @Post('/login')
  // async login(@Body() req:providerloginDto ) {
  //     try {
  //         const result = await this.serviceproviderService.Login(req)
  //         return result
  //     } catch (error) {
  //         return {
  //             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //             message: error.message
  //         };
  //     }

  // }


  
  @Post('/register')
  async createProvider(@Body() req: providerloginDto){
    try{
      const result = await this.serviceproviderService.Create(req)
      return result
    } catch(error){
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }

@Post('/login')
async login(@Body() req: providerloginDto){
    try{
      const result = await this.serviceproviderService.loginProvider(req)
      return result
    } catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
 
}
