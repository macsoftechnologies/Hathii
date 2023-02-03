import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ratingDto } from './Dto/rating.dto';
import { reviewDto } from './Dto/review.dto';
import { userRatingDto } from './Dto/userrating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiTags('rating')
  @ApiBody({
    type: ratingDto,
  })
  @Post('addrating')
  async Create(@Body() req: ratingDto) {
    try {
      const result = await this.ratingService.createRate(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.OK,
        Message: error,
      };
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: ratingDto
  })
  @Post('/averageratingofvendor')
  async averageratingofvendor(@Body() req: ratingDto) {
    try{
      const rate = await this.ratingService.vendorOverallRating(req);
      return rate
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('rating')
  @Get('getRating')
  async resRate() {
    try {
      const result = await this.ratingService.getRate();
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.OK,
        Message: error,
      };
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: ratingDto,
  })
  @Post('removerating')
  async deleterate(@Body() req: ratingDto) {
    try {
      const result = await this.ratingService.deleteRate(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }

  @ApiTags('rating')
  @Post('getratebyid')
  async getRes(@Body() req: ratingDto) {
    try {
      const result = await this.ratingService.RateById(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }
  
  @ApiTags('rating')
  @ApiBody({
    type: reviewDto
  }) 
  @Post('/addReview')
  async addReview(@Body() req: reviewDto) {
    try{
      const add = await this.ratingService.createReview(req);
      if(add){
        return add;
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @Get('/getreviewlist')
  async getReviewList() {
    try{
      const add = await this.ratingService.getReviewlist();
      if(add){
        return add;
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: reviewDto
  }) 
  @Post('/getreviewbyid')
  async getReviewById(@Body() req: reviewDto) {
    try{
      const add = await this.ratingService.getReviewbyid(req);
      if(add){
        return add;
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: reviewDto
  }) 
  @Post('/updateReview')
  async updatereview(@Body() req: reviewDto) {
    try{
      const add = await this.ratingService.updateReview(req);
      if(add){
        return add;
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: reviewDto
  }) 
  @Post('/deleteReview')
  async deletereview(@Body() req: reviewDto) {
    try{
      const add = await this.ratingService.deleteReview(req);
      if(add){
        return add;
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: userRatingDto
  })
  @Post('/adduserRating')
  async addUserRating(@Body() req: userRatingDto) {
    try{
      const adduserrating = await this.ratingService.createUserRating(req);
      return adduserrating;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: userRatingDto
  })
  @Get('/getusersRating')
  async getUsersRating() {
    try{
      const getuserrating = await this.ratingService.getUsersrating();
      return getuserrating;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: userRatingDto
  })
  @Post('/getUserRating')
  async getUserRating(@Body() req: userRatingDto) {
    try{
      const getuserrating = await this.ratingService.getUserrating(req);
      return getuserrating;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: userRatingDto
  })
  @Post('/updateuserRating')
  async updateUserRating(@Body() req: userRatingDto) {
    try{
      const updateuserrating = await this.ratingService.updateUserRating(req);
      return updateuserrating;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('rating')
  @ApiBody({
    type: userRatingDto
  })
  @Post('/deleteuserRating')
  async deleteUserRating(@Body() req: userRatingDto) {
    try{
      const deleteuserrating = await this.ratingService.deleteUserRating(req);
      return deleteuserrating;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }
 
}
