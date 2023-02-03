import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDto } from 'src/user/dto/user.dto';
import { user } from 'src/user/dto/user.schema';
import { orderDto } from './dto/order.dto';
 import { order } from './schema/order.schema';
 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(order.name) private orderModel: Model<order>,
    @InjectModel(user.name) private userModel: Model<user>,
  ) {}

  async createOrder(req: orderDto) {
    try {
      const orderRes = await this.orderModel.create(req);
      if (orderRes) {
        return {
          statusCode: HttpStatus.OK,
          res: orderRes,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Messager: error,
      };
    }
  }

  async getOrder() {
    try {
      const getRes = await this.orderModel.find();
      if (getRes) {
        return {
          statusCode: HttpStatus.OK,
          data: getRes,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async deleteorder(req: orderDto) {
    try {
      const delOrder = await this.orderModel.deleteOne({
        orderId: req.orderId,
      });
      if (delOrder) {
        return {
          statusCode: HttpStatus.OK,
          del: delOrder,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async editOrder(req: orderDto) {
    try {
      const editOrder = await this.orderModel.updateOne(
        { orderId: req.orderId },
        {
          $set: {
            userId: req.userId,
            orderQuantity: req.orderQuantity,
            time: req.time,
            date: req.date,
            vendorProductId: req.vendorProductId,
            vendorId: req.vendorId,
            status: req.status
          },
        },
      );
      if (editOrder) {
        return {
          statusCode: HttpStatus.OK,
          res: editOrder,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getOrderId(req: orderDto) {
    try {
      const resp = await this.orderModel.findOne({ orderId: req.orderId });
      if (resp) {
        return {
          statusCode: HttpStatus.OK,
          data: resp,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async receivedOrdersOfVendor(req: userDto) {
    try{
      const receivedorders = await this.userModel.findOne({
        $or: [{vendorId: req.vendorId},{userId: req.userId}]
      });
      if(receivedorders) {
        const receivedOrders = await this.orderModel.aggregate([
          {$match: 
            {$and: [
                {status: 'received'},
                {
                  $or: [
                    {vendorId: receivedorders.vendorId},
                    {userId: receivedorders.userId}
                  ]
                }
              ]}
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId'
            }
          }
        ]);
        const count = await this.orderModel.aggregate([
          {$match: 
            {$and: [
                {status: 'received'},
                {
                  $or: [
                    {vendorId: receivedorders.vendorId},
                    {userId: receivedorders.userId}
                  ]
                }
              ]}
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId'
            }
          },
          {
            $count: "count"
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: "Received Orders of vendor",
          data: receivedOrders,
          count: count,
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid Request",
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async completedOrdersOfVendor(req: userDto) {
    try{
      const completedorders = await this.userModel.findOne({
        $or: [{vendorId: req.vendorId},{userId: req.userId}]
      });
      if(completedorders) {
        const receivedOrders = await this.orderModel.aggregate([
          {$match: 
            {$and: [
                {status: 'completed'},
                {
                  $or: [
                    {vendorId: completedorders.vendorId},
                    {userId: completedorders.userId}
                  ]
                }
              ]}
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId'
            }
          }
        ]);
        const count = await this.orderModel.aggregate([
          {$match: 
            {$and: [
                {status: 'completed'},
                {
                  $or: [
                    {vendorId: completedorders.vendorId},
                    {userId: completedorders.userId}
                  ]
                }
              ]}
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId'
            }
          },
          {
            $count: "count"
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: "Received Orders of vendor",
          data: receivedOrders,
          count: count,
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid Request",
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

 }
