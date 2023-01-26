// import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { orderDto } from './dto/order.dto';
// import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @ApiTags('users')
//   @ApiBody({
//     type:orderDto
//   })
//   @Post('/addorder')
//   async CreateOrder(@Body() req:orderDto){
//     try{
//       const result=await this.usersService.createOrder(req)
//       return result
//     }catch(error){
//       return{
//         statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
//         Message:error 
//       }
//     }
//   }
//   @ApiTags('users')
//   @Get('/getOrders')
//   async OrdersGet(){
//     try{
//       const result =await this.usersService.getOrder()
//       return result
//     }catch(error){
//       return{
//         statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
//         Message:error 
//       }
//     }
//   }

//   @ApiTags('users')
//   @ApiBody({
//     type:orderDto
//   })
//  @Post('/deleteOrder')
//  async orderDel(@Body() req:orderDto){
//   try{
//     const result=await this.usersService.deleteorder(req)
//     return result
//   }catch(error){
//     return{
//       statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
//       Message:error 
//     }
//   }
//  }

//  @ApiTags('users')
//  @ApiBody({
//    type:orderDto
//  })
//   @Post('/editOrder')
//   async Updateorder(@Body() req:orderDto){
//     try{
//       const  resupdate=await this.usersService.editOrder(req)
//       return resupdate
//     }catch(error){
//       return{
//         statusCode:HttpStatus.OK,
//         Message:error 
//       }
//     }
//   }


//   @ApiTags('users')
//   @ApiBody({
//     type:orderDto
//   })
//   @Post('/getOrderById')
//     async OrderId(@Body() req:orderDto){
//       try{
//         const result=await  this.usersService.getOrderId(req)
//         return result
//       }catch(error){
//         return{
//           statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
//           Message:error 
//         }
//       }
//     } 

//     @ApiTags('users')
//   @ApiBody({
//     type: userDto
//   }) 
//   @Post('/userregistration')
//   async userRegister(@Body() req: userDto) {
//     try{
//       const add = await this.usersService.registerUser(req);
//       if(add){
//         return add;
//       }
//     } catch(error) {
//       return{
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         msg: error,
//       }
//     }
//   }

//   @ApiTags('users')
//   @ApiBody({
//     type: userDto
//   })
//   @Post('/loginuser')
//   async userLogin(@Body() req: userDto) {
//     try{
//       const enter = await this.usersService.loginUser(req);
//       return enter;
//     } catch(error) {
//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         msg: error,
//       }
//     }
//   }

//   @ApiTags('users')
//   @Get('/getuserslist')
//   async getUsersList() {
//     try{
//       const add = await this.usersService.getUserslist();
//       if(add){
//         return add;
//       }
//     } catch(error) {
//       return{
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         msg: error,
//       }
//     }
//   }

//   @ApiTags('users')
//   @ApiBody({
//     type: userDto
//   }) 
//   @Post('/getusersbyid')
//   async getUserById(@Body() req: userDto) {
//     try{
//       const add = await this.usersService.getUserbyid(req);
//       if(add){
//         return add;
//       }
//     } catch(error) {
//       return{
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         msg: error,
//       }
//     }
//   }

//   @ApiTags('users')
//   @ApiBody({
//     type: userDto
//   }) 
//   @Post('/updateUser')
//   async updateuser(@Body() req: userDto) {
//     try{
//       const add = await this.usersService.updateUser(req);
//       if(add){
//         return add;
//       }
//     } catch(error) {
//       return{
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         msg: error,
//       }
//     }
//   }

//   @ApiTags('users')
//   @ApiBody({
//     type: userDto
//   }) 
//   @Post('/deleteUser')
//   async deleteuser(@Body() req: userDto) {
//     try{
//       const add = await this.usersService.deleteUser(req);
//       if(add){
//         return add;
//       }
//     } catch(error) {
//       return{
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         msg: error,
//       }
//     }
//   }
// }
