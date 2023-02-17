import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/user/dto/user.schema';
import { ratingDto } from './Dto/rating.dto';
import { reviewDto } from './Dto/review.dto';
import { userRatingDto } from './Dto/userrating.dto';
import { rating } from './Schema/rating.schema';
import { review } from './Schema/review.schema';
import { userRating } from './Schema/userrating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(rating.name) private ratingModel: Model<rating>,
    @InjectModel(review.name) private reviewModel: Model<review>,
    @InjectModel(userRating.name) private userRatingModel: Model<userRating>,
  ) {}

  async createRate(req: ratingDto) {
    try {
      const rate = await this.ratingModel.create(req);
      if (rate) {
        rate.averageRating =
          (req.vendorVerficationRating + req.overallRating + req.responseRate) /
          3;
        const updating = await this.ratingModel.updateOne(
          { ratingId: rate.ratingId },
          {
            $set: {
              ratingId: rate.ratingId,
              userId: rate.userId,
              responseRate: rate.responseRate,
              rating: rate.rating,
              trustRating: rate.trustRating,
              vendorVerficationRating: rate.vendorVerficationRating,
              overallRating: rate.overallRating,
              vendorId: rate.vendorId,
              vendorProductId: rate.vendorProductId,
              role: rate.role,
              averageRating:
                (rate.responseRate +
                  rate.vendorVerficationRating +
                  rate.overallRating) /
                3,
            },
          },
        );
        return {
          statusCode: HttpStatus.OK,
          res: rate,
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
        Message: error,
      };
    }
  }

  async vendorOverallRating(req: ratingDto) {
    try {
      const vendorRating = await this.ratingModel.find({
        $and: [{userId: req.userId},{role: req.role}]
      });
      if (vendorRating) {
        const count = await this.ratingModel
          .find({ $and: [{userId: req.userId},{role: req.role}] })
          .count();
        let sum = vendorRating.reduce((a, b) => a + b.averageRating, 0);
        const avg = sum / count;
        return {
          statusCode: HttpStatus.OK,
          msg: 'OverAll Rating of the vendor',
          averageRatingofVendor: avg,
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

  async getVendorRatings(req: ratingDto) {
    try{
      const getvendorratings = await this.ratingModel.find({role: req.role});
      if(getvendorratings) {
        const getvendors = await this.ratingModel.aggregate([
          {$match: {userId: getvendorratings[0].userId}},
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId'
            }
          },
         // {$match: {vendorId: getvendorratings[0].vendorId}},
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId'
            }
          },
          {$match: {vendorProductId: getvendorratings[0].vendorProductId}},
          {
            $lookup: {
              from: 'vendorproducts',
              localField: 'vendorProductId',
              foreignField: 'vendorProdId',
              as: 'vendorProductId'
            }
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: "Ratings of the requested role",
          data: getvendors,
        }
      }
    }  catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  async getRate() {
    try {
      const res = await this.ratingModel.find();
      if (res) {
        const vendorsget = await this.ratingModel.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'userId',
              as: 'userId',
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'vendorId',
              foreignField: 'vendorId',
              as: 'vendorId',
            }
          },
          {
            $lookup: {
              from: 'vendorproducts',
              localField: 'vendorProdId',
              foreignField: 'vendorProdId',
              as: 'vendorProdId',
            }
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          message: 'details',
          data: vendorsget,
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
        Message: error,
      };
    }
  }

  async updateRating(req: ratingDto) {
    try {
      const moderate = await this.ratingModel.updateOne(
        { ratingId: req.ratingId },
        {
          $set: {
            userId: req.userId,
            responseRate: req.responseRate,
            rating: req.rating,
            trustRating: req.trustRating,
            vendorVerficationRating: req.vendorVerficationRating,
            overallRating: req.overallRating,
            vendorId: req.vendorId,
            vendorProductId: req.vendorProductId,
            averageRating: req.averageRating,
            role: req.role,
          },
        },
      );
      if(moderate) {
        return {
          statusCode: HttpStatus.OK,
          msg: "Updated rate successfully",
          data: moderate,
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
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: 'Invalid Request',
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
      const rateRes = await this.ratingModel.findOne({
        ratingId: req.ratingId,
      });
      if (rateRes) {
        return {
          statusCode: HttpStatus.OK,
          result: {
            rateRes,
          },
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
        Message: error,
      };
    }
  }

  async createReview(req: reviewDto) {
    try {
      const add = await this.reviewModel.create(req);
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Review added',
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

  async getReviewlist() {
    try {
      const add = await this.reviewModel.find();
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'List of reviews',
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

  async getReviewbyid(req: reviewDto) {
    try {
      const add = await this.reviewModel.findOne({ reviewId: req.reviewId });
      // console.log(add)
      if (add) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Review details',
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

  async updateReview(req: reviewDto) {
    try {
      const add = await this.reviewModel.updateOne(
        { reviewId: req.reviewId },
        { $set: { userId: req.userId, review: req.review } },
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

  async deleteReview(req: reviewDto) {
    try {
      const add = await this.reviewModel.deleteOne({ reviewId: req.reviewId });
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

  async createUserRating(req: userRatingDto) {
    try {
      const addUserRating = await this.userRatingModel.create(req);
      if (addUserRating) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Added userRating Successfully',
          data: addUserRating,
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

  async getUsersrating() {
    try {
      const getUserRating = await this.userRatingModel.find();
      if (getUserRating) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Here are userRatings',
          data: getUserRating,
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

  async getUserrating(req: userRatingDto) {
    try {
      const getUserRating = await this.userRatingModel.findOne({
        userRatingId: req.userRatingId,
      });
      if (getUserRating) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Here is the userRating',
          data: getUserRating,
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

  async updateUserRating(req: userRatingDto) {
    try {
      const updateUserRating = await this.userRatingModel.updateOne(
        { userRatingId: req.userRatingId },
        { $set: { vendorId: req.vendorId, userRating: req.userRating } },
      );
      if (updateUserRating) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated userRating Successfully',
          data: updateUserRating,
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

  async deleteUserRating(req: userRatingDto) {
    try {
      const removeUserRating = await this.userRatingModel.deleteOne({
        userRatingId: req.userRatingId,
      });
      if (removeUserRating) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted userRating Successfully',
          data: removeUserRating,
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
}
