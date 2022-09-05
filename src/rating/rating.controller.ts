import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ratingDto } from './Dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  
  @ApiTags('rating')
  @ApiBody({
    type:ratingDto
  })
  @Post('addrating')
  async Create(@Body() req:ratingDto){
    try{
      const result=await this.ratingService.createRate(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.OK,
        Message:error
        
      }
    }
  }

 
     @ApiTags('rating')
     @Get('getRating')
     async resRate(){
      try{
        const result=await this.ratingService.getRate()
        return result
      }catch(error){
        return{
          statusCode:HttpStatus.OK,
          Message:error
        }
      }
     }

 
     @ApiTags('rating')
     @ApiBody({
       type:ratingDto
     })
     @Post('removerating')
       async deleterate(@Body() req:ratingDto){

        try{
          const result=await this.ratingService.deleteRate(req)
          return result
        }catch(error){
          return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
          }
        }
       }
       
       
       @ApiTags('rating')
       @Post(':id')
       async getRes(@Param('id')id:string){
        try{

          const result=await this.ratingService.RateById(id)
          return result 
        }catch(error){
          return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
             Message:error
    
          }
        }
       }

}
