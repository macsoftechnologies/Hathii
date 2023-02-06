import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { categoryDto } from 'src/category/dto/categoty.dto';
import { Category } from 'src/category/schema/category.schema';
import { userDto } from 'src/user/dto/user.dto';
import { user } from 'src/user/dto/user.schema';
import { inventoryManagementDto } from './dto/inventoryManangement.dto';
import { productRequestDto } from './dto/productRequest.dto';
import { vendorproductDto } from './dto/vendorproduct.dto';
import { inventoryManagement } from './schema/inventoryManagemement.schema';
import { ProductRequest } from './schema/productRequest.schema';
import { vendorproduct } from './schema/vendorproduct.schema';

@Injectable()
export class VendorproductsService {
  constructor(
    @InjectModel(vendorproduct.name)
    private vendorproductModel: Model<vendorproduct>,
    @InjectModel(inventoryManagement.name)
    private inventoryManagenmentModel: Model<inventoryManagement>,
    @InjectModel(ProductRequest.name) private productRequest: Model<ProductRequest>,
    @InjectModel(user.name) private userModel: Model<user>,
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async vendorprodcreate(req: vendorproductDto, image) {
    try {

      console.log(req, 'documents...', image);
      if (image) {
        const reqDoc = image.map((doc, index) => {
          let IsPrimary = false;
          if (index == 0) {
            IsPrimary = true;
          }
          const randomNumber = Math.floor(Math.random() * 1000000 + 1);
          return doc.filename;
        });

        req.productImage = reqDoc;
      }

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

  async getvendorproductsofVendor(req: userDto) {
    try{
      const vendor = await this.userModel.findOne({
        $or: [
          {vendorId: req.vendorId},
          {userId: req.userId},
          {providerId: req.providerId}
        ]
      });
      if(vendor) {
        const vendorproducts = await this.userModel.aggregate([
          {$match: {vendorId: vendor.vendorId}},
          {
            $lookup: {
              from: "vendorproducts",
              localField: "vendorId",
              foreignField: "vendorId",
              as: "vendorproducts",
            }
          }
        ]);
        const count = await this.vendorproductModel.aggregate([
          {$match: {vendorId: vendor.vendorId}},
          {
            $lookup: {
              from: "vendorproducts",
              localField: "vendorId",
              foreignField: "vendorId",
              as: "vendorproducts",
            }
          },
          {
            $count: "count"
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: "vendorproducts of a vendor",
          data: vendorproducts,
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

  async getvendorproductbyid(req: vendorproductDto) {
    try{
      const getProduct = await this.vendorproductModel.findOne({vendorProdId: req.vendorProdId});
      if(getProduct) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Here is the Product Details",
          data: getProduct,
        }
      } else{
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async editvendProd(req: vendorproductDto, image) {
    try {

      console.log(req, 'documents...', image);
      if (image) {
        const reqDoc = image.map((doc, index) => {
          let IsPrimary = false;
          if (index == 0) {
            IsPrimary = true;
          }
          const randomNumber = Math.floor(Math.random() * 1000000 + 1);
          return doc.filename;
        });

        req.productImage = reqDoc;
      }

      const imagesCount = await this.vendorproductModel.findOne({
        $and: [{ vendorId: req.vendorId }, { vendorProdId: req.vendorProdId }],
      });

      if (!imagesCount.productImage || imagesCount.productImage.length === 0) {
        console.log('.........................if');
      const updateVend = await this.vendorproductModel.updateOne(
        { $and: [{ vendorId: req.vendorId }, { vendorProdId: req.vendorProdId }] },
        {
          $set: {
            vendorName: req.vendorName,
            productName: req.productName,
            productImage: req.productImage,
            price: req.price,
            discount: req.discount,
            finalPrice: req.finalPrice,
            longitude: req.longitude,
            latitude: req.latitude,
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
    } else {
      console.log('.........................if');
      const updateVend = await this.vendorproductModel.updateOne(
        { $and: [{ vendorId: req.vendorId }, { vendorProdId: req.vendorProdId }] },
        {
          $set: {
            vendorName: req.vendorName,
            productName: req.productName,
            // productImage: req.productImage,
            price: req.price,
            discount: req.discount,
            finalPrice: req.finalPrice,
            longitude: req.longitude,
            latitude: req.latitude,
            shopType: req.shopType,
            specifications: req.productDetails,
            policy: req.policy,
            description: req.description,
          },
        },
      );
      const imagesQuery = await this.vendorproductModel.updateMany(
        { $and: [{ vendorId: req.vendorId }, { vendorProdId: req.vendorProdId }] },
        {
          $push: { productImage: { $each: req.productImage } },
        },
      );

      console.log(imagesQuery, 'imagesQuery');
      console.log(req.productImage, 'productImage............');
      if (updateVend) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: updateVend,
        };
      }
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      msg: 'Invalid Request',
    };
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
            longitude: req.longitude,
            latitude: req.latitude,
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

  async stockalert(req: vendorproductDto) {
    try{
      const alert = await this.vendorproductModel.findOne({vendorProdId: req.vendorProdId});
      if(alert) {
      if(alert.quantity <= 10) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Limited Stock.Please add products",
          data: {
            quantity: alert.quantity
          }
        }
      } else {
        return{
          statusCode: HttpStatus.OK,
          msg: "Products Stock is perfectly alright.",
          data: {
            quantity: alert.quantity
          }
        }
      }
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        msg: "We didn't find your products",
      }
    }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async searchProductsByPriceandShop(req: vendorproductDto) {
    try {
      const search = await this.vendorproductModel.find({
        $or: [
          { price: new RegExp('.*' + req.price + '.*', 'i') },
          { discount: new RegExp('.*' + req.discount + '.*', 'i') },
          { shopType: new RegExp('.*' + req.shopType + '.*', 'i') },
          { productName: new RegExp('.*' + req.productName + '.*', 'i') },
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

  async getProductByCategory(req: vendorproductDto) {
    try{
      const getproductsbycat = await this.categoryModel.findOne({categoryId: req.categoryId});
      if(getproductsbycat) {
        const getprods = await this.vendorproductModel.aggregate([
          {$match: {categoryId: getproductsbycat.categoryId}},
          {
            $lookup:{
              from: 'categories',
              localField: 'categoryId',
              foreignField: 'categoryId',
              as: 'categoryId',
            }
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: "searched category products",
          data: getprods,
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid request"
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  async sendproductRequest(req: productRequestDto) {
    try{
      const requestSend = await this.productRequest.create(req);
      if(requestSend){
        return {
          statusCode: HttpStatus.OK,
          msg: "ProductRequest send",
          data: requestSend,
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
        msg: error
      }
    }
  }

  async getproductRequest() {
    try{
      const getList = await this.productRequest.find();
      if(getList) {
        return {
          statusCode: HttpStatus.OK,
          msg: "List of productRequests",
          data: getList,
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
        msg: error
      }
    }
  }

  async getProdRequestById(productRequestId: string) {
    try{
      const getProduct = await this.productRequest.findOne({productRequestId});
      if(getProduct) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Productrequest Details",
          data: getProduct,
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
        msg: error
      }
    }
  }

  async editproductRequest(req: productRequestDto) {
    try{
      const editproductrequest = await this.productRequest.updateOne({productRequestId: req.productRequestId},{
        $set: {
          userId: req.userId,
          vendorId: req.vendorId,
          vendorProductId:  req.vendorProductId,
          quantity: req.quantity,
          orderTotalAmount: req.orderTotalAmount, 
          status: req.status
        }
      });
      if(editproductrequest) {
        return {
          statusCode: HttpStatus.OK,
          msg: "updated successfully",
          data: editproductrequest
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

  async productRequestsofUser(req: userDto) {
    try{
      const vendor = await this.userModel.findOne({$or:[{vendorId: req.vendorId},{userId: req.userId}]});
      if(vendor) {
        const vendorproducts = await this.userModel.aggregate([
          {$match: {$or: [{vendorId: vendor.vendorId},{userId: vendor.userId}]}},
          {
            $lookup: {
              from: "productrequests",
              localField: "vendorId",
              foreignField: "vendorId",
              as: "vendorProductrequests",
            }
          },
          {
            $lookup:{
              from: "productrequests",
              localField: "userId",
              foreignField: "userId",
              as: "userProductRequests"
            }
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: "productrequests of a vendor",
          data: vendorproducts,
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

  async pendingRequestsOfVendor(req: userDto) {
    try{
      const acceptedproductrequests = await this.userModel.findOne({
        $or: [{vendorId: req.vendorId},{userId: req.userId}]
      });
      if(acceptedproductrequests) {
        const acceptedrequests = await this.productRequest.aggregate([
          {$match: 
            {$and: [
                {status: 'pending'},
                {
                  $or: [
                    {vendorId: acceptedproductrequests.vendorId},
                    {userId: acceptedproductrequests.userId}
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
        const count = await this.productRequest.aggregate([
          {$match: 
            {$and: [
                {status: 'pending'},
                {
                  $or: [
                    {vendorId: acceptedproductrequests.vendorId},
                    {userId: acceptedproductrequests.userId}
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
            $count: 'count'
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: 'Received Requests of a user',
          data: acceptedrequests,
          count: count,
        }
      } else{
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid Requests",
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  async acceptedRequestsOfVendor(req: userDto) {
    try{
      const acceptedproductrequests = await this.userModel.findOne({
        $or: [{vendorId: req.vendorId},{userId: req.userId}]
      });
      if(acceptedproductrequests) {
        const acceptedrequests = await this.productRequest.aggregate([
          {$match: 
            {$and: [
                {status: 'received'},
                {
                  $or: [
                    {vendorId: acceptedproductrequests.vendorId},
                    {userId: acceptedproductrequests.userId}
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
        const count = await this.productRequest.aggregate([
          {$match: 
            {$and: [
                {status: 'received'},
                {
                  $or: [
                    {vendorId: acceptedproductrequests.vendorId},
                    {userId: acceptedproductrequests.userId}
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
            $count: 'count'
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: 'Received Requests of a user',
          data: acceptedrequests,
          count: count,
        }
      } else{
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid Requests",
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  // completed count api
  async completedRequestsOfVendor(req: userDto) {
    try{
      const completedproductrequests = await this.userModel.findOne({
        $or: [{vendorId: req.vendorId},{userId: req.userId}]
      });
      if(completedproductrequests) {
        const acceptedrequests = await this.productRequest.aggregate([
          {$match: 
            {$and: [
                {status: 'completed'},
                {
                  $or: [
                    {vendorId: completedproductrequests.vendorId},
                    {userId: completedproductrequests.userId}
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
        const count = await this.productRequest.aggregate([
          {$match: 
            {$and: [
                {status: 'completed'},
                {
                  $or: [
                    {vendorId: completedproductrequests.vendorId},
                    {userId: completedproductrequests.userId}
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
            $count: 'count'
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: 'Completed Requests of a user',
          data: acceptedrequests,
          count: count,
        }
      } else{
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid Requests",
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  async deleteRequest(req: productRequestDto) {
    try{
      const eliminateRequest = await this.productRequest.deleteOne({productRequestId: req.productRequestId});
      if(eliminateRequest) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Deleted Successfully",
          data: eliminateRequest,
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
        msg: error
      }
    }
  }
}
