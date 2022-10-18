import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { vendorproductDto } from './dto/vendorproduct.dto';
import { vendorproduct } from './schema/vendorproduct.schema';

@Injectable()
export class VendorproductsService {
  constructor(
    @InjectModel(vendorproduct.name)
    private vendorproductModel: Model<vendorproduct>,
  ) {}

  async vendorprodcreate(req: vendorproductDto) {
    try {
      const vendorProres = await this.vendorproductModel.create(req);
      if (vendorProres) {
        return {
          statusCode: HttpStatus.OK,
          VendproRes: vendorProres,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getVenProd() {
    try {
      const vendRes = await this.vendorproductModel.find();
      if (vendRes) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'list of vendorPorducts',
          data: vendRes,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async deleteProd(req: vendorproductDto) {
    try {
      const delprod = await this.vendorproductModel.deleteOne({
        vendorProdId: req.vendorProdId,
      });
      if (delprod) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'deleted Sucessfully',
          delres: delprod,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async editvendProd(req: vendorproductDto) {
    try {
      const updateVend = await this.vendorproductModel.updateOne(
        { vendorProdId: req.vendorProdId },
        {
          $set: {
            vendorName: req.vendorName,
            productName: req.productName,
            price: req.price,
            discount: req.discount,
            finalPrice: req.finalPrice,
            shopType: req.shopType,
            specifications: req.specifications,
          },
        },
      );
      if (updateVend) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'updated Sucessfully',
          vendupdateRes: updateVend,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async inventoryApi(req: vendorproductDto) {
    try {
      const inventoryapi = await this.vendorproductModel.findOne({
        vendorProdId: req.vendorProdId,
      });
      if (inventoryapi) {
        req.hold = inventoryapi.hold + req.request;
        req.availability = inventoryapi.quantity - inventoryapi.hold;
      }
      const inventoryUpdate = await this.vendorproductModel.updateOne(
        { vendorProdId: req.vendorProdId },
        {
          $set: {
            vendorName: req.vendorName,
            productName: req.productName,
            price: req.price,
            discount: req.discount,
            finalPrice: req.finalPrice,
            shopType: req.shopType,
            categoryId: req.categoryId,
            specifications: req.specifications,
            hold: req.hold,
            request: req.request,
            availability: req.availability,
            quantity: req.quantity,
          },
        },
      );
      if(inventoryUpdate) {
        return {
            statusCode: HttpStatus.OK,
            msg: "Updated",
            data: inventoryUpdate,
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: "Invalid Request",
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }
}
