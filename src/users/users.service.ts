// import { HttpStatus, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { SharedService } from 'src/shared/shared.service';
// import { orderDto } from './dto/order.dto';
 
// import { order } from './schema/order.schema';
 

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(order.name) private orderModel: Model<order>,
//    // @InjectModel(User.name) private userModel: Model<User>,
//     private sharedService: SharedService,
//   ) {}

//   async createOrder(req: orderDto) {
//     try {
//       const orderRes = await this.orderModel.create(req);
//       if (orderRes) {
//         return {
//           statusCode: HttpStatus.OK,
//           res: orderRes,
//         };
//       }
//     } catch (error) {
//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         Messager: error,
//       };
//     }
//   }

//   async getOrder() {
//     try {
//       const getRes = await this.orderModel.find();
//       if (getRes) {
//         return {
//           statusCode: HttpStatus.OK,
//           data: getRes,
//         };
//       }
//     } catch (error) {
//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         Message: error,
//       };
//     }
//   }

//   async deleteorder(req: orderDto) {
//     try {
//       const delOrder = await this.orderModel.deleteOne({
//         orderId: req.orderId,
//       });
//       if (delOrder) {
//         return {
//           statusCode: HttpStatus.OK,
//           del: delOrder,
//         };
//       }
//     } catch (error) {
//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         Message: error,
//       };
//     }
//   }

//   async editOrder(req: orderDto) {
//     try {
//       const editOrder = await this.orderModel.updateOne(
//         { orderId: req.orderId },
//         {
//           $set: {
//             userId: req.userId,
//             orderQuantity: req.orderQuantity,
//             time: req.time,
//             date: req.date,
//             productId: req.productId,
//             vendorId: req.vendorId,
//             status: req.status,
//           },
//         },
//       );
//       if (editOrder) {
//         return {
//           statusCode: HttpStatus.OK,
//           res: editOrder,
//         };
//       }
//     } catch (error) {
//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         Message: error,
//       };
//     }
//   }

//   async getOrderId(req: orderDto) {
//     try {
//       const resp = await this.orderModel.findOne({ orderId: req.orderId });
//       if (resp) {
//         return {
//           statusCode: HttpStatus.OK,
//           data: resp,
//         };
//       }
//     } catch (error) {
//       return {
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         Message: error,
//       };
//     }
//   }

  // async registerUser(req: userDto) {
  //   try {
  //     const add = await this.userModel.create(req);
  //     const encrypt = await this.sharedService.encryption(req.password);
  //     const replacement = await this.userModel.replaceOne(
  //       { password: add.password },
  //       {
  //         userId: add.userId,
  //         firstName: add.firstName,
  //         lastName: add.lastName,
  //         email: add.email,
  //         password: encrypt.encryptedText,
  //         contactNumber: add.contactNumber,
  //         address: add.address,
  //       },
  //     );
  //     // console.log(add)
  //     if (replacement) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         msg: 'User Registered Successfully',
  //         data: add,
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       msg: 'Invalid Request',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     };
  //   }
  // }

  // async loginUser(req: userDto) {
  //   try {
  //     const enter = await this.userModel.findOne({
  //       $or: [{ email: req.email }, { contactNumber: req.contactNumber }],
  //     });
  //     const encrypt = await this.sharedService.encryption(req.password);
  //     console.log(encrypt);
  //     if (encrypt) {
  //       if (encrypt.encryptedText === enter.password) {
  //         return {
  //           statusCode: HttpStatus.OK,
  //           msg: 'Login Success',
  //           Data: enter,
  //         };
  //       } else {
  //         return {
  //           statusCode: HttpStatus.UNAUTHORIZED,
  //           msg: 'Invalid Password',
  //         };
  //       }
  //     } else {
  //       return {
  //         statusCode: HttpStatus.BAD_REQUEST,
  //         msg: 'Invalid Request',
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     };
  //   }
  // }

  // async getUserslist() {
  //   try {
  //     const add = await this.userModel.find();
  //     // console.log(add)
  //     if (add) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         msg: 'List of users',
  //         data: add,
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       msg: 'Invalid Request',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     };
  //   }
  // }

  // async getUserbyid(req: userDto) {
  //   try {
  //     const add = await this.userModel.findOne({ userId: req.userId });
  //     // console.log(add)
  //     if (add) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         msg: 'User details',
  //         data: add,
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       msg: 'Invalid Request',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     };
  //   }
  // }

  // async updateUser(req: userDto) {
  //   try {
  //     const add = await this.userModel.updateOne(
  //       { userId: req.userId },
  //       {
  //         $set: {
  //           firstName: req.firstName,
  //           lastName: req.lastName,
  //           email: req.email,
  //           password: req.password,
  //           contactNumber: req.contactNumber,
  //           address: req.address,
  //         },
  //       },
  //     );
  //     const encrypt = await this.sharedService.encryption(req.password);
  //     const replacement = await this.userModel.updateOne(
  //       { userId: req.userId },
  //       {
  //         $set: {
  //           userId: req.userId,
  //           firstName: req.firstName,
  //           lastName: req.lastName,
  //           email: req.email,
  //           password: encrypt.encryptedText,
  //           contactNumber: req.contactNumber,
  //           address: req.address,
  //         },
  //       },
  //     );
  //     // console.log(replacement);
  //     // console.log(encrypt);
  //     if (replacement) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         msg: 'Updated Successfully',
  //         data: add,
  //         encrypt: encrypt,
  //         replacement: replacement,
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       msg: 'Invalid Request',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     };
  //   }
  // }

  // async deleteUser(req: userDto) {
  //   try {
  //     const add = await this.userModel.deleteOne({ userId: req.userId });
  //     // console.log(add)
  //     if (add) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         msg: 'Deleted Successfully',
  //         data: add,
  //       };
  //     }
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       msg: 'Invalid Request',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     };
  //   }
  // }
// }
