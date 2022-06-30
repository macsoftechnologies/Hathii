import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ratingDto } from './Dto/rating.dto';
import { rating } from './Schema/rating.schema';

@Injectable()
export class RatingService {
    constructor(@InjectModel(rating.name) private ratingModel:Model<rating>){}

 
 async createRate(req:ratingDto){
    try{
        const rate=await this.ratingModel.create(req)
        if(rate){
            return{
            statusCode:HttpStatus.OK,
            res:rate
                
            }
        }
    
    }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error

        }

    }
 }  
   
 
    async getRate(){
       
        try{
       const res=await this.ratingModel.find()
       if(res){
        return{
            statusCode:HttpStatus.OK,
            message:'details',
            data:{
                res
            }
        }
       }   
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error

            }
        }
    }

   
           async deleteRate(req){
             
            try{
                const delrate=await this.ratingModel.deleteOne({buyerId:req.buyerId})
                if(delrate){
                    return{
                    statusCode:HttpStatus.OK,
                    Message:'deleted succesfully',
                    del:{
                        delrate
                    }
                  }
                }
                
            }catch(error){
                return{
                    statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                    Message:error
                }
            }

           }           
 

   
        async RateById(id:string){
            try{
                const rateRes=await this.ratingModel.findById(id)
                if(rateRes){
                    return{
                        statusCode:HttpStatus.OK,
                        result:{
                            rateRes
                        }
                    }
                }
            }catch(error){
                return{
                    statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                    Message:error
                }
            }
        }

}
