import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/shared/shared.service';
import { userDto } from 'src/user/dto/user.dto';
import { user } from 'src/user/dto/user.schema';
import { adminDto } from './Dto/admin.dto';
import { adminproductDto } from './Dto/adminproduct.dto';
import { appliedThemesDto } from './Dto/appliedThemes.dto';
import { complaintDto } from './Dto/complaints.dto';
import { contactDto } from './Dto/contact.dto';
import { couponDto } from './Dto/coupon.dto';
import { feedbackDto } from './Dto/feedback.dto';
import { notificationsDto } from './Dto/notifications.dto';
import { rewardpointDto } from './Dto/rewardpoint.dto';
import { themeDto } from './Dto/theme.dto';
import { admin } from './Schema/admin.schema';
import { adminproduct } from './Schema/adminproduct.schema';
import { appliedTheme } from './Schema/appliedThemes.schema';
import { complaint } from './Schema/complaints.schema';
import { contact } from './Schema/contact.schema';
import { Coupon } from './Schema/coupon.schema';
import { feedback } from './Schema/feedback.schema';
import { Notification } from './Schema/notifications.schema';
import { rewardpoint } from './Schema/rewardpoint.schema';
import { Theme } from './Schema/theme.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(admin.name) private adminModel: Model<admin>,
    @InjectModel(adminproduct.name)
    private adminProductModel: Model<adminproduct>,
    @InjectModel(contact.name) private contactModel: Model<contact>,
    @InjectModel(feedback.name) private feedbackModel: Model<feedback>,
    @InjectModel(complaint.name) private complaintModel: Model<complaint>,
    @InjectModel(rewardpoint.name) private rewardpointModel: Model<rewardpoint>,
    private sharedService: SharedService,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
    @InjectModel(Theme.name) private themeModel: Model<Theme>,
    @InjectModel(appliedTheme.name) private appliedThemeModel: Model<Theme>,
  ) {}

  async Create(req: adminDto) {
    try {
      const registerRes = await this.adminModel.create(req);

      if (registerRes) {
        return {
          statusCode: HttpStatus.OK,
          message: 'admin  Registered Successfully',
          data: registerRes,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async loginAdmin(req: adminDto) {
    try {
      const loginRes = await this.adminModel
        .findOne({
          $or: [{ email: req.email }, { mobileNum: req.mobileNum }],
        })
        .lean();
      if (loginRes) {
        if (loginRes.password === req.password) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Login SuccessFull',
            login: loginRes,
          };
        } else {
          return {
            statusCode: HttpStatus.NOT_FOUND,
            msg: 'Password invalid',
          };
        }
      }
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid Password',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  // async adminUpdate(req: adminDto) {
  //   try{
  //     const moderate = await this.adminModel.updateOne({adminId: req.adminId},{
  //       $set: {
  //         adminId: req.adminId,
  //         email: req.email,
  //         password: req.password,
  //         mobileNum: req.mobileNum,
  //       }
  //     });
  //     const encrypt = await this.sharedService.encryption(req.password);
  //     const replacement = await this.adminModel.updateOne(
  //       { password: req.password },
  //       {
  //         $set: {
  //           adminId: req.adminId,
  //           email: req.email,
  //           password: encrypt.encryptedText,
  //           mobileNum: req.mobileNum
  //         }
  //       }
  //     );
  //     if(replacement) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         msg: "Updated Succesfully",
  //         data: moderate,
  //         encrypt: encrypt,
  //         replacement: replacement,
  //       }
  //     }
  //   } catch(error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     }
  //   }
  // }

  async addadminProd(req: adminproductDto, image) {
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

        req.productImage = reqDoc.toString();
      }
      console.log(req);
      // return false;
      const adminProd = await this.adminProductModel.create(req);

      if (adminProd) {
        return {
          statusCode: HttpStatus.OK,
          AdminProduct: adminProd,

          //        }
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async getadminProd() {
    try {
      const getProd = await this.adminProductModel.find();
      if (getProd) {
        const getvendors = await this.adminProductModel.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId'
            }
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          Message: 'list of products',
          data: getvendors,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getProductId(req: adminproductDto) {
    try {
      const adminProdId = await this.adminProductModel.findOne({
        productId: req.productId,
      });
      if (adminProdId) {
        return {
          statusCode: HttpStatus.OK,
          prod: adminProdId,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async updateAdminProduct(req: adminproductDto, image) {
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

        req.productImage = reqDoc.toString();
      }
      console.log(req);

      const adminProdId = await this.adminProductModel.updateOne(
        { productId: req.productId },
        {
          $set: {
            vendorId: req.vendorId,
            categoryId: req.categoryId,
            productName: req.productName,
            productDescription: req.productDescription,
            productImage: req.productImage,
            adminProductId: req.adminProductId,
            specifications: req.specifications,
            price: req.price,
            quantity: req.quantity,
            discount: req.discount,
          },
        },
      );
      if (adminProdId) {
        return {
          statusCode: HttpStatus.OK,
          prod: adminProdId,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async deleteAdminProduct(req: adminproductDto) {
    try {
      const adminProdId = await this.adminProductModel.deleteOne({
        productId: req.productId,
      });
      if (adminProdId) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          prod: adminProdId,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async Createcontact(req: contactDto) {
    try {
      const contactres = await this.contactModel.create(req);
      if (contactres) {
        if (contactres) {
          return {
            statusCode: HttpStatus.OK,
            contactRes: contactres,
          };
        }
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async updateContact(req: contactDto) {
    try {
      const resUpdate = await this.contactModel.updateOne(
        { contactId: req.contactId },
        {
          $set: {
            name: req.name,
            mailId: req.mailId,
            phoneNumber: req.phoneNumber,
          },
        },
      );
      if (resUpdate) {
        return {
          statusCode: HttpStatus.OK,
          Updateres: resUpdate,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async deleteContact(req: contactDto) {
    try {
      const delconct = await this.contactModel.deleteOne({
        contactId: req.contactId,
      });
      if (delconct) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'deleted Sucessfully',
          delConctact: delconct,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getcontact() {
    try {
      const getres = await this.contactModel.find();
      if (getres) {
        return {
          statusCode: HttpStatus.OK,
          getRes: getres,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async createfeddback(req: feedbackDto) {
    try {
      const feedbackres = await this.feedbackModel.create(req);
      if (feedbackres) {
        return {
          statusCode: HttpStatus.OK,
          res: feedbackres,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async updatefeedback(req: feedbackDto) {
    try {
      const editfeedback = await this.feedbackModel.updateOne(
        { feedbackId: req.feedbackId },
        {
          $set: {
            userId: req.userId,
            vendorId: req.vendorId,
            feedback: req.feedback,
          },
        },
      );
      if (editfeedback) {
        return {
          statusCode: HttpStatus.OK,
          UpdateRes: editfeedback,
        };
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

  async deletefeedback(req: feedbackDto) {
    try {
      const delfeedback = await this.feedbackModel.deleteOne({
        feedbackId: req.feedbackId,
      });
      if (delfeedback) {
        return {
          statusCode: HttpStatus.OK,
          res: delfeedback,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getfeedback() {
    try {
      const getfeed = await this.feedbackModel.find();
      if (getfeed) {
        const getFeedBack = await this.feedbackModel.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId',
            },
          },
        ]);
        return {
          statusCode: HttpStatus.OK,
          res: getFeedBack,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async feedbackbyId(req: feedbackDto) {
    try {
      const resfeedId = await this.feedbackModel.find({
        feedbackId: req.feedbackId,
      });
      if (resfeedId) {
        return {
          statusCode: HttpStatus.OK,
          feedId: resfeedId,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async createcomplaint(req: complaintDto) {
    try {
      const complaintReq = await this.complaintModel.create(req);
      if (complaintReq) {
        return {
          statusCode: HttpStatus.OK,
          complaintRes: complaintReq,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.OK,
        Message: error,
      };
    }
  }

  async deletecomplaint(req: complaintDto) {
    try {
      const deleteComp = await this.complaintModel.deleteOne({
        complaintId: req.complaintId,
      });
      if (deleteComp) {
        return {
          statusCode: HttpStatus.OK,
          removeComp: deleteComp,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getcomplainte() {
    try {
      const rescomplaint = await this.complaintModel.find();
      if (rescomplaint) {
        const getFeedBack = await this.complaintModel.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId',
            },
          },
        ]);
        return {
          statusCode: HttpStatus.OK,
          complaintres: getFeedBack,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getComplaintByid(req: complaintDto) {
    try {
      const resId = await this.complaintModel.find({
        complaintId: req.complaintId,
      });
      if (resId) {
        return {
          statusCode: HttpStatus.OK,
          resComp: resId,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async editComplaint(req: complaintDto) {
    try {
      const editComp = await this.complaintModel.updateOne(
        { complaintId: req.complaintId },
        {
          $set: {
            userId: req.userId,
            vendorId: req.vendorId,
            complaint: req.complaint,
          },
        },
      );
      if (editComp) {
        return {
          statusCode: HttpStatus.OK,
          updateComp: editComp,
        };
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

  async createrewardpoint(req: rewardpointDto) {
    try {
      const resreward = await this.rewardpointModel.create(req);
      if (resreward) {
        return {
          statusCode: HttpStatus.OK,
          rewardRes: resreward,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getRewardPoints() {
    try {
      const respoints = await this.rewardpointModel.find();
      if (respoints) {
        const getFeedBack = await this.rewardpointModel.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId',
            },
          },
        ]);
        return {
          statusCode: HttpStatus.OK,
          points: getFeedBack,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getpointById(req: rewardpointDto) {
    try {
      const getPointsRes = await this.rewardpointModel.find({
        rewardId: req.rewardId,
      });
      if (getPointsRes) {
        return {
          statusCode: HttpStatus.OK,
          PointRes: getPointsRes,
        };
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

  async deletePoints(req: rewardpointDto) {
    try {
      const delpoint = await this.rewardpointModel.deleteOne({
        rewardId: req.rewardId,
      });
      if (delpoint) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'deleted Sucessfully',
          delRes: delpoint,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async editPoints(req: rewardpointDto) {
    try {
      const editRes = await this.rewardpointModel.updateOne(
        { rewardId: req.rewardId },
        {
          $set: {
            userId: req.userId,
            vendorId: req.vendorId,
            rewardpoints: req.rewardpoints,
          },
        },
      );
      if (editRes) {
        return {
          statusCode: HttpStatus.OK,
          pointEdit: editRes,
        };
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

  async addCoupon(req: couponDto) {
    try {
      const add = await this.couponModel.create(req);
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Couon added',
          data: add,
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

  async getCouponsList() {
    try {
      const getAll = await this.couponModel.find();
      if (getAll) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Coupons List',
          data: getAll,
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

  async getCouponById(req: couponDto) {
    try {
      const getCoupon = await this.couponModel.findOne({
        couponId: req.couponId,
      });
      if (getCoupon) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Coupon Details',
          data: getCoupon,
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

  async editCoupon(req: couponDto) {
    try {
      const moderate = await this.couponModel.updateOne(
        { couponId: req.couponId },
        {
          $set: {
            couponAmount: req.couponAmount,
            userName: req.userName,
            description: req.description,
            coupons: req.coupons,
          },
        },
      );
      if (moderate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Succesfully',
          data: moderate,
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

  async removeCoupon(req: couponDto) {
    try {
      const remove = await this.couponModel.deleteOne({
        couponId: req.couponId,
      });
      if (remove) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          data: remove,
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

  async addNot(req: notificationsDto) {
    try {
      const add = await this.notificationModel.create(req);
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Notification added',
          data: add,
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

  async getNot() {
    try {
      const add = await this.notificationModel.find();
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Notifications list',
          data: add,
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

  async getNotById(req: notificationsDto) {
    try {
      const add = await this.notificationModel.findOne({
        notificationId: req.notificationId,
      });
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Notification details',
          data: add,
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

  async updateNot(req: notificationsDto) {
    try {
      const moderate = await this.notificationModel.updateOne(
        { notificationId: req.notificationId },
        {
          $set: {
            vendorId: req.vendorId,
            providerId: req.providerId,
            notification: req.notification,
            token: req.token,
          },
        },
      );
      if (moderate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: moderate,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invlaid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async deleteNot(req: notificationsDto) {
    try {
      const remove = await this.notificationModel.deleteOne({
        notificationId: req.notificationId,
      });
      if (remove) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          data: remove,
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

  async addThemes(req: themeDto, image) {
    try {
      if (image) {
        if (image.themeImage && image.themeImage[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.themeImage[0],
          );
          req.themeImage = attachmentFile;
        }
        if (image.themeColor && image.themeColor[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.themeColor[0],
          );

          req.themeColor = attachmentFile;
        }
      }

      const add = await this.themeModel.create(req);
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Theme added Successfully',
          data: add,
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

  async getThemes() {
    try {
      const getAll = await this.themeModel.find();
      if (getAll) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'List of Themes',
          data: getAll,
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

  async getThemeById(req: themeDto) {
    try {
      const getIt = await this.themeModel.findOne({ themeId: req.themeId });
      if (getIt) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Details of the theme',
          data: getIt,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async updatetheme(req: themeDto, image) {
    try {
      if (image) {
        if (image.themeImage && image.themeImage[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.themeImage[0],
          );
          req.themeImage = attachmentFile;
        }
        if (image.themeColor && image.themeColor[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.themeColor[0],
          );

          req.themeColor = attachmentFile;
        }
      }

      const moderate = await this.themeModel.updateOne(
        { themeId: req.themeId },
        {
          $set: {
            themeImage: req.themeImage,
            themeColor: req.themeColor,
          },
        },
      );
      if (moderate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: moderate,
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

  async deleteTheme(req: themeDto) {
    try {
      const eliminate = await this.themeModel.deleteOne({
        themeId: req.themeId,
      });
      if (eliminate) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          data: eliminate,
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

  async addappliedTheme(req: appliedThemesDto) {
    try {
      const addappliedtheme = await this.appliedThemeModel.create(req);
      if (addappliedtheme) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Theme applied',
          data: addappliedtheme,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getappliedTheme() {
    try {
      const getappliedtheme = await this.appliedThemeModel.find();
      if (getappliedtheme) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'List of applied themes',
          data: getappliedtheme,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getappliedThemeById(req: appliedThemesDto) {
    try {
      const getappliedtheme = await this.appliedThemeModel.findOne({
        appliedThemeId: req.appliedThemeId,
      });
      if (getappliedtheme) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Applied theme',
          data: getappliedtheme,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async updateappliedThemeById(req: appliedThemesDto) {
    try {
      const updateappliedtheme = await this.appliedThemeModel.updateOne(
        { appliedThemeId: req.appliedThemeId },
        {
          $set: {
            userId: req.userId,
            vendorId: req.vendorId,
          },
        },
      );
      if (updateappliedtheme) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Applied theme',
          data: updateappliedtheme,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async deleteappliedThemeById(req: appliedThemesDto) {
    try {
      const deleteappliedtheme = await this.appliedThemeModel.deleteOne({
        appliedThemeId: req.appliedThemeId,
      });
      if (deleteappliedtheme) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Applied theme',
          data: deleteappliedtheme,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }
}
