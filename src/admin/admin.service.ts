import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { adminDto } from './Dto/admin.dto';
import { adminproductDto } from './Dto/adminproduct.dto';
import { complaintDto } from './Dto/complaints.dto';
import { contactDto } from './Dto/contact.dto';
import { feedbackDto } from './Dto/feedback.dto';
import { rewardpointDto } from './Dto/rewardpoint.dto';
import { admin } from './Schema/admin.schema';
import { adminproduct } from './Schema/adminproduct.schema';
import { complaint } from './Schema/complaints.schema';
import { contact } from './Schema/contact.schema';
import { feedback } from './Schema/feedback.schema';
import { rewardpoint } from './Schema/rewardpoint.schema';

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
  ) {}

  async Create(req: adminDto) {
    try {
      const registerRes = await this.adminModel.create(req);
      if (registerRes) {
        return {
          statusCode: HttpStatus.OK,
          message: 'admin  Registered Successfully',
          data: {
            authentication: {
              respons: registerRes,
            },
          },
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
          $or: [
            { email: req.email },
            { password: req.password },
            { mobileNum: req.mobileNum },
          ],
        })
        .lean();
      if (loginRes) {
        if (loginRes.password === req.password) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Login SuccessFull',
            login: loginRes,
          };
        }
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Password',
        };
      }

      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'admin  not found',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

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
        return {
          statusCode: HttpStatus.OK,
          Message: 'lst of products',
          data: {
            getProd,
          },
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
        return {
          statusCode: HttpStatus.OK,
          res: getfeed,
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
        return {
          statusCode: HttpStatus.OK,
          complaintres: rescomplaint,
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
            feedback: req.feedback,
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
        return {
          statusCode: HttpStatus.OK,
          points: respoints,
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
        msg: "Invalid Request",
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
}
