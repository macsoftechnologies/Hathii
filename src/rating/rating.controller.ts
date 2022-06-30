import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ratingDto } from './Dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

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
