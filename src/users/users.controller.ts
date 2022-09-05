import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { orderDto } from './dto/order.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiBody({
    type:orderDto
  })
  @Post('/addorder')
  async CreateOrder(@Body() req:orderDto){
    try{
      const result=await this.usersService.createOrder(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }
  @ApiTags('users')
  @Get('/getOrders')
  async OrdersGet(){
    try{
      const result =await this.usersService.getOrder()
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }

  @ApiTags('users')
  @ApiBody({
    type:orderDto
  })
 @Post('/deleteOrder')
 async orderDel(@Body() req:orderDto){
  try{
    const result=await this.usersService.deleteorder(req)
    return result
  }catch(error){
    return{
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      Message:error 
    }
  }
 }

 @ApiTags('users')
 @ApiBody({
   type:orderDto
 })
  @Post('/editOrder')
  async Updateorder(@Body() req:orderDto){
    try{
      const  resupdate=await this.usersService.editOrder(req)
      return resupdate
    }catch(error){
      return{
        statusCode:HttpStatus.OK,
        Message:error 
      }
    }
  }


  @ApiTags('users')
  @ApiBody({
    type:orderDto
  })
  @Post('/getOrderById')
    async OrderId(@Body() req:orderDto){
      try{
        const result=await  this.usersService.getOrderId(req)
        return result
      }catch(error){
        return{
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          Message:error 
        }
      }
    } 
}
