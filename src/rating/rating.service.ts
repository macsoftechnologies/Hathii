import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ratingDto } from './Dto/rating.dto';
import { reviewDto } from './Dto/review.dto';
import { rating } from './Schema/rating.schema';
import { review } from './Schema/review.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(rating.name) private ratingModel: Model<rating>,
    @InjectModel(review.name) private reviewModel: Model<review>,
  ) {}

  async createRate(req: ratingDto) {
    try {
      const rate = await this.ratingModel.create(req);
      if (rate) {
        return {
          statusCode: HttpStatus.OK,
          res: rate,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  async getRate() {
    try {
      const res = await this.ratingModel.find();
      if (res) {
        return {
          statusCode: HttpStatus.OK,
          message: 'details',
          data: {
            res,
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

  async deleteRate(req) {
    try {
      const delrate = await this.ratingModel.deleteOne({
        buyerId: req.buyerId,
      });
      if (delrate) {
        return {
          statusCode: HttpStatus.OK,
          Message: 'deleted succesfully',
          del: {
            delrate,
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

  async RateById(req: ratingDto) {
    try {
      const rateRes = await this.ratingModel.findOne({ratingId: req.ratingId});
      if (rateRes) {
        return {
          statusCode: HttpStatus.OK,
          result: {
            rateRes,
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

 
  async createReview(req: reviewDto) {
    try{
        const add = await this.reviewModel.create(req);
        // console.log(add)
        if(add) {
            return {
                statusCode: HttpStatus.OK,
                msg: "Review added",
                data: add,
            }
        }
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            msg: "Invalid Request",
        }
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            msg: error,
        }
    }
  }

  async getReviewlist() {
    try{
        const add = await this.reviewModel.find();
        // console.log(add)
        if(add) {
            return {
                statusCode: HttpStatus.OK,
                msg: "List of reviews",
                data: add,
            }
        }
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            msg: "Invalid Request",
        }
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            msg: error,
        }
    }
  }

  async getReviewbyid(req: reviewDto) {
    try{
        const add = await this.reviewModel.findOne({reviewId: req.reviewId});
        // console.log(add)
        if(add) {
            return {
                statusCode: HttpStatus.OK,
                msg: "Review details",
                data: add,
            }
        }
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            msg: "Invalid Request",
        }
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            msg: error,
        }
    }
  }

  async updateReview(req: reviewDto) {
    try{
        const add = await this.reviewModel.updateOne({reviewId: req.reviewId},
            {$set: {userId: req.userId,review: req.review}});
        // console.log(add)
        if(add) {
            return {
                statusCode: HttpStatus.OK,
                msg: "Updated Successfully",
                data: add,
            }
        }
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            msg: "Invalid Request",
        }
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            msg: error,
        }
    }
  }

  async deleteReview(req: reviewDto) {
    try{
        const add = await this.reviewModel.deleteOne({reviewId: req.reviewId});
        // console.log(add)
        if(add) {
            return {
                statusCode: HttpStatus.OK,
                msg: "Deleted Successfully",
                data: add,
            }
        }
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            msg: "Invalid Request",
        }
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            msg: error,
        }
    }
  }
}
