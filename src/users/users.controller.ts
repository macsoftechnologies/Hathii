import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { userDto } from 'src/user/dto/user.dto';
import { orderDto } from './dto/order.dto';
import { UsersService } from './users.service';
var moment = require('moment');
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiBody({
    type: orderDto,
  })
  @Post('/addorder')
  async CreateOrder(@Body() req: orderDto) {
    req.date = moment(req.createdAt).format('DD-MM-YYYY');
    req.time = moment(req.createdAt).format('hh:mm:ss');
    console.log(req.date);
    console.log(req.time);
    try {
      const result = await this.usersService.createOrder(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
  @ApiTags('users')
  @Get('/getOrders')
  async OrdersGet() {
    try {
      const result = await this.usersService.getOrder();
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @ApiTags('users')
  @ApiBody({
    type: orderDto,
  })
  @Post('/deleteOrder')
  async orderDel(@Body() req: orderDto) {
    try {
      const result = await this.usersService.deleteorder(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @ApiTags('users')
  @ApiBody({
    type: orderDto,
  })
  @Post('/editOrder')
  async Updateorder(@Body() req: orderDto) {
    try {
      const resupdate = await this.usersService.editOrder(req);
      return resupdate;
    } catch (error) {
      return {
        statusCode: HttpStatus.OK,
        Message: error,
      };
    }
  }

  @ApiTags('users')
  @ApiBody({
    type: orderDto,
  })
  @Post('/getOrderById')
  async OrderId(@Body() req: orderDto) {
    try {
      const result = await this.usersService.getOrderId(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @ApiTags('users')
  @ApiBody({
    type: userDto,
  })
  @Post('/receivedordersofvendor')
  async recievedorders(@Body() req: userDto) {
    try {
      const result = await this.usersService.receivedOrdersOfVendor(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @ApiTags('users')
  @ApiBody({
    type: userDto,
  })
  @Post('/completedordersofvendor')
  async completedorders(@Body() req: userDto) {
    try {
      const result = await this.usersService.completedOrdersOfVendor(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
}
