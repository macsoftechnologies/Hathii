import { BadRequestException, Body, Controller, Delete, HttpStatus, Param, Patch, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
 
import {  loginDto,  userDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
   
  @Post('/createAdmin')
  async createAdmin(@Body() body:userDto,@Res()  Response){
    try{
       const  response=await this.userService.create({
           role:'admin',
           ... body
       })
     return Response.status(response.statusCode).send(response)
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error
      }
    }
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name:'labourcard' } ]),
  )
  @Post('/createServiceProvider')
  async createServiceProv(@Body() body:userDto,@UploadedFiles() image){
    try{
      const response =await this.userService.create({
        role:'serviceprovider',
        ...body
      },image)
      return response
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }

  @Post('/addService')
  async createServ(@Body() body:userDto){
    try{
      
      const response =await this.userService.create({
        role:'service',
        ...body
      })
      return response
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }
 
  @Post('/createUser')
  async createUser(@Body() body:userDto ){
    try{
      const response=await this.userService.create({
        role:'user',
       ...body,})
      return response
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name:'shopPhoto'},{name:'color'},{name:'blogPost'}]),
  )
  @Post('/createVendor')
  async createVendor(@Body() body:userDto,@UploadedFiles() image){
    try{
      const response=await this.userService.create({
        role:'vendor',
       ...body},image)
      return response
      console.log(response)
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }

  
  
  @Post('/login')
  async login(@Body() req: userDto){
      try{
        const result = await this.userService.loginUser(req)
        return result
      } catch(error){
        return{
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        };
      }
    }

 
 
  @Post('getUserById')
 async userget(@Body() body:userDto){
  try{
    const response=await this.userService.getUserid(body)
    return response
  }catch(error){
    return {
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
    }
  }
 }  
 
 @Post('/getVendorById')
 async vendorGet(@Body() body:userDto){
  try{
    const response=await this.userService.getVendorid(body)
    return response
  }catch(error){
    return {
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
    }
  }
 }


 @Post('/getProviderById')
 async providerGet(@Body() body:userDto){
  try{
    const response=await this.userService.getProviderid(body)
    return response
  }catch(error){
    return {
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error
    }
  }
 }

 
 @Post('deleteUser')
 async delUser(@Body() body:userDto){
  try{
    const result=await this.userService.deleteuser(body)
    return result
  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
    }
  }
 }


 @Post('deleteVendor')
 async removeVendor(@Body() body:userDto){
  try{
    const result=await this.userService.deleteVendor(body)
    return result
  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
    }
  }
 }

 @Post('deleteProvider')
 async removeProvider(@Body() body:userDto){
  try{
    const result=await this.userService.deleteProvider(body)
    return result
  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
    }
  }
 }



 @Post('/updateUser')
 async updateUser(@Body() body:userDto){
  try{
    const result=await this.userService.editUser(body)
    return result
  }catch(error){
    return {
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
    }
  }
 }
 

@UseInterceptors(
  FileFieldsInterceptor([{name:'blogPost'},{name:'color'},{name:'shopPhoto'}])
)
@Post('updateVendor')
async updateVendor(@Body() body:userDto,@UploadedFiles() image){
  try{
    const response=await this.userService.updateVendor(body,image)
    return response
  }catch(error){
    return {
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
      
    }
  }
}

@UseInterceptors(
  FileFieldsInterceptor([{name:'labourcard'} ])
)
@Post('updateServiceProvider')
async updateProvider(@Body() body:userDto,@UploadedFiles() image){
  try{
    const response=await this.userService. updateServiceProvider(body,image)
    return response
  }catch(error){
    return {
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      message:error 
      
    }
  }
}


 
 

@Put('/:id')
async updateUserRoles(@Param('id') id: string, @Body() roles:userDto) {
  try{
  const user = await this.userService.findById(id);
  user.role = roles.role;
  await this.userService.save(user);
  return{
    statusCode:HttpStatus.OK,
    message:'updated sucessfully',
    data:user
  } 
}catch(error){
  return {
    statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
    message:error 
  }
}
}


  @Post('/getuser')
  async getUsers(@Body() body:userDto){
    try{
      const result=await this.userService.getAll(body)
      return result
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }


  @Post('/getServiceById')
  async servicedata(@Body() body:userDto){
      try{
        const result=await this.userService.getService(body)
        return result
      }catch(error){
        return {
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          message:error 
        }
      }
  }


  @Post('/updateService')
  async editservice(@Body() body:userDto){
    try{
      const response=await this.userService.editService(body)
      return response
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }
 
}
