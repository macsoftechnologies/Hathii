import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { inventoryManagementDto } from './dto/inventoryManangement.dto';
import { vendorproductDto } from './dto/vendorproduct.dto';
import { inventoryManagement } from './schema/inventoryManagemement.schema';
import { vendorproduct } from './schema/vendorproduct.schema';

@Injectable()
export class VendorproductsService {
  constructor(
    @InjectModel(vendorproduct.name)
    private vendorproductModel: Model<vendorproduct>,
    @InjectModel(inventoryManagement.name)
    private inventoryManagenmentModel: Model<inventoryManagement>,
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
            specifications: req.productDetails,
            policy: req.policy,
            description: req.description,
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
            productDetails: req.productDetails,
            policy: req.policy,
            description: req.description,
            hold: req.hold,
            request: req.request,
            availability: req.availability,
            quantity: req.quantity,
          },
        },
      );
      if (inventoryUpdate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated',
          data: inventoryUpdate,
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

  async addInventManagement(req: inventoryManagementDto) {
    try {
      const addinventmanage = await this.inventoryManagenmentModel.create(req);
      if (addinventmanage) {
        return {
          statusCode: HttpStatus.OK,
          data: addinventmanage,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getInventory() {
    try {
      const getInventList = await this.inventoryManagenmentModel.find();
      if (getInventList) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'list of inventory',
          data: getInventList,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async inventoryManage(req: inventoryManagementDto) {
    try {
      const inventmanage = await this.inventoryManagenmentModel.findOne({
        inventoryManagementId: req.inventoryManagementId,
      });
      if (inventmanage) {
        req.closingStock = req.openingStock - req.sale;
      }
      const update = await this.inventoryManagenmentModel.updateOne(
        { inventoryManagementId: req.inventoryManagementId },
        {
          $set: {
            vendorProdId: req.vendorProdId,
            openingStock: req.openingStock,
            sale: req.sale,
            closingStock: req.closingStock,
          },
        },
      );
      if (update) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: update,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async searchProductsByPriceandShop(req: vendorproductDto) {
    try {
      const search = await this.vendorproductModel.find({
        $or: [
          { price: new RegExp('.*' + req.price + '.*', 'i') },
          { discount: new RegExp('.*' + req.discount + '.*', 'i') },
          { shopType: new RegExp('.*' + req.shopType + '.*', 'i') },
          { productDetails: new RegExp('.*' + req.productDetails + '.*', 'i') },
        ],
      });
      if (search) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'searched products',
          data: search,
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

  async searchProductByCategory(req: vendorproductDto) {
    try{
      const searchbycat = await this.vendorproductModel.find({
        $or: [
          {categoryId: new RegExp('.*' + req.categoryId + '.*', 'i')},
          {subCategoryId: new RegExp('.*' + req.subCategoryId + '.*', 'i')},
        ]
      });
      if(searchbycat) {
        const catandsubcat = await this.vendorproductModel.aggregate([
          {$match: {
            $or: [
              {categoryId: req.categoryId},
              {subCategoryId: req.subCategoryId},
            ]
          }},
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryId',
              foreignField: 'categoryId',
              as: 'categoryId'
            }
          },
          {
            $lookup: {
              from: 'subcategories',
              localField: 'subCategoryId',
              foreignField: 'subcategoryId',
              as: 'subCategoryId'
            }
          }
        ]);
        if(catandsubcat) {
          return {
            statusCode: HttpStatus.OK,
            data: catandsubcat,
          }
        }
      } else{
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
