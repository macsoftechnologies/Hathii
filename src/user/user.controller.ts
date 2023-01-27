import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
    FileFieldsInterceptor([  { name: 'labourcard' } ]),
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

  @Post('/createService')
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
    FileFieldsInterceptor([  { name: 'shopPhoto' },{name:'color'}, {name: 'blogPost'}]),
  )
  @Post('/createVendor')
 
  async createVendor(@Body() body:userDto,@UploadedFiles() image){
    try{
      const response=await this.userService.create({
        role:'vendor',
       ...body},image)
      return response
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

 
  @Delete('/deletUser/:id')
  async deleteUser(@Param('id') id:string){
    try{
      const result=await this.userService.deleteuser(id)
      return result
      console.log(result)
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }

  
}