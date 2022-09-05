import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/shared/shared.service';
import { vendorDto } from './Dto/venders.dto';
import { vendor } from './Schema/venders.schema';

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(vendor.name) private vendorModel: Model<vendor>,
    private sharedService: SharedService,
  ) {}

  async Create(req: vendorDto, image) {
    try {
      // console.log(req, "req...", image)
      if (image) {
        if (image.shopPhoto && image.shopPhoto[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.shopPhoto[0],
          );
          req.shopPhoto = attachmentFile;
        }
        if (image.blogPost && image.blogPost[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.blogPost[0],
          );

          req.blogPost = attachmentFile;
        }
        if(image.color && image.color[0]){
          const attachmentFile= await this.sharedService.saveFile(
            image.color[0],
          );
          req.color=attachmentFile;
        }
      }

      const addVendorResp = await this.vendorModel.create(req);
      if (addVendorResp) {
        return {
          statusCode: HttpStatus.OK,
          addVendorRes: addVendorResp,
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

  async getVendor() {
    try {
      const data = await this.vendorModel.find();
      if (data) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'vendors list ',
          item: {
            list: data,
          },
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async deleteVen(req: vendorDto) {
    try {
      const vend = await this.vendorModel.deleteOne({ vendorId: req.vendorId });
      if (vend) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'deleted Sucessfully',
          data: {
            vend
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

  async getVendorById(req: vendorDto) {
    try {
      const vendorDetails = await this.vendorModel.find({
        vendorId: req.vendorId,
      });
      if (vendorDetails) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'Vendor',
          data: {
            vendorDetailsResp: vendorDetails,
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

  async updateVendor(req: vendorDto, image) {
    try {
      // console.log(req, "req...", image)
      if (image) {
        if (image.shopPhoto && image.shopPhoto[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.shopPhoto[0],
          );
          req.shopPhoto = attachmentFile;
        }
        if (image.blogPost && image.blogPost[0]) {
          const attachmentFile = await this.sharedService.saveFile(
            image.blogPost[0],
          );

          req.blogPost = attachmentFile;
        }
        if(image.color && image.color[0]){
          const attachmentFile=await this.sharedService.saveFile(
            image.color[0],
          )
          req.color=attachmentFile;
        }
      }

      const updateVendorResp = await this.vendorModel.updateOne(
        { vendorId: req.vendorId },
        {
          $set: {
            vendorName:req.vendorName,
            mobileNum:req.mobileNum,
            email:req.email,
            shopName:req.shopName,
            shopTimings:req.shopTimings,
            addLocation:req.addLocation,
            modeOfBussiness:req.modeOfBussiness,
            Gstin:req.Gstin,
            shopProof:req.shopProof,
            blogPost:req.blogPost,
            shopPhoto:req.shopPhoto,
            color:req.color,
            rating:req.rating
          },
        },
      );
      if (updateVendorResp) {
        return {
          statusCode: HttpStatus.OK,
          updateVendorRes: updateVendorResp,
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
}