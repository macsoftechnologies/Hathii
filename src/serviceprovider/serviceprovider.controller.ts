import { Body, Controller, Get, HttpStatus, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { providerloginDto } from './Dto/providerlogin.dto';
import { serviceProvDto } from './Dto/serviceprovider.dto';
import { ServiceproviderService } from './serviceprovider.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
 
@Controller('serviceprovider')
export class ServiceproviderController {
  constructor(private readonly serviceproviderService: ServiceproviderService) {}


  @ApiTags('serviceprovider')
  @ApiBody({
    type:serviceProvDto
  })
 @Post('/addServiceProvider')
  @UseInterceptors(
      AnyFilesInterceptor({
          storage: diskStorage({
              destination: './files',
              filename: (req, file, cb) => {
                  const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                  cb(null, `${randomName}${extname(file.originalname)}`)
              }
          }),
      }),
  )
  async CreateserviceProd(@Body() req: serviceProvDto, @UploadedFiles() image) {
      try {
          const result = await this.serviceproviderService.addserviceProd(req, image)
          console.log("result", result);

          return result
      } catch (error) {
          return {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: error.message,
          };
      }
  }




  

  @ApiTags('serviceprovider')
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

    @ApiTags('serviceprovider')
    @ApiBody({
    type:serviceProvDto
     })
    @Post('/getproviderById')
     async getRes(@Body() req:serviceProvDto){
      try{

        const result=await this.serviceproviderService.ProviderById(req)
        return result 
      }catch(error){
        return{

          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          Message:error
  
        }
      }
     }
 
   
      // @Post('UpdateserviceProvider')
      // async servieProv(@Body() req:serviceProvDto){
      //   try{
      //      const result=await this.serviceproviderService.updateProv(req)
      //      return result

      //   }catch(error){
      //     return{
      //       statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      //       Message:error
      //     }
      //   }
      // }  
          
    @ApiTags('serviceprovider')
    @ApiBody({
    type:serviceProvDto
     })
      @Post('/updateServiceProvider')
      @UseInterceptors(
          AnyFilesInterceptor({
              storage: diskStorage({
                  destination: './files',
                  filename: (req, file, cb) => {
                      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                      cb(null, `${randomName}${extname(file.originalname)}`)
                  }
              }),
          }),
      )
      async updatProvider(@Body() req: serviceProvDto, @UploadedFiles() image) {
          try {
              const result = await this.serviceproviderService.editserviceProd(req, image)
              console.log("result", result);
    
              return result
          } catch (error) {
              return {
                  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: error.message,
              };
          }
      }
     
       
      @ApiTags('serviceprovider')
      @ApiBody({
      type:serviceProvDto
       })
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


  @ApiTags('serviceprovider')
    @ApiBody({
    type:providerloginDto
     })
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

  
@ApiTags('serviceprovider')
@ApiBody({
  type:providerloginDto
   })
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
