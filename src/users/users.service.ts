import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/shared/shared.service';
import { orderDto } from './dto/order.dto';
 import { order } from './schema/order.schema';
 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(order.name) private orderModel: Model<order>,
    private sharedService: SharedService,
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
            productId: req.productId,
            vendorId: req.vendorId,
            status: req.status,
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
 }
