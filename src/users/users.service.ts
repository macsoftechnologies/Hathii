import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderDto } from './dto/order.dto';
import { userDto } from './dto/users.dto';
import { order } from './schema/order.schema';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(order.name) private orderModel: Model<order>,
    @InjectModel(User.name) private userModel: Model<User>,
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
      const editOrder = await this.orderModel.updateOne({
        orderId: req.orderId,
      });
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

  async registerUser(req: userDto) {
    try {
      const add = await this.userModel.create(req);
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'User Registered Successfully',
          data: add,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getUserslist() {
    try {
      const add = await this.userModel.find();
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'List of users',
          data: add,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getUserbyid(req: userDto) {
    try {
      const add = await this.userModel.findOne({ userId: req.userId });
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'User details',
          data: add,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async updateUser(req: userDto) {
    try {
      const add = await this.userModel.updateOne(
        { userId: req.userId },
        {
          $set: {
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email,
            password: req.password,
            contactNumber: req.contactNumber,
            address: req.address,
          },
        },
      );
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: add,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async deleteUser(req: userDto) {
    try {
      const add = await this.userModel.deleteOne({ userId: req.userId });
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          data: add,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }
}
