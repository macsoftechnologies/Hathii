import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ratingDto } from './Dto/rating.dto';
import { reviewDto } from './Dto/review.dto';
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
  @Post('/addRev')
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
  @Post('/getrevirebyid')
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
 
}
