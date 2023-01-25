import { Body, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
 
import {  loginDto, userDto,   } from './dto/user.dto';
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

  
  @Post('/createServiceProvider')
  async createServices(@Body() body:userDto){
    try{
      const response =await this.userService.create({
        role:'serviceprovider',
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

  
  
  @Post('/createLogin')
  async Login(@Body() body:loginDto):Promise<any>{
    try{
      const users=await this.userService.login(body)
   
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error 
      }
    }
  }

 
}