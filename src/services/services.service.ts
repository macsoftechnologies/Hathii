import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { listeners } from 'process';
import { serviceDto } from './Dto/service.dto';
import { service } from './Schema/service.schema';

@Injectable()
export class ServicesService {
    constructor(@InjectModel(service.name) private serviceModel: Model<service>){}

    async CreateService(req:serviceDto){
        try{
            const  result=await this.serviceModel.create(req)
            if(result){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'Registred sucesfully',
                    data:{
                        createSer:result
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
     

async getService(){
    try{
        const list =await this.serviceModel.find()
        if(list){
            return{
                statusCode:HttpStatus.OK,
                Message:'list of services',
                 res:{
                    serviceList:list
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

 
async Deleteservice(req:serviceDto){
    try{
        const removeSer=await this.serviceModel.deleteOne({serviceId:req.serviceId})
        if(removeSer){
            return{
            statusCode:HttpStatus.OK,
            Message:'Deleted sucessfully',
            Data:{
                removeSer
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


async updateSer(req:serviceDto){

    try{
        const response=await this.serviceModel.updateOne({serviceId:req.serviceId},
            {$set:{
                name:req.name,
                mobileNum :req.mobileNum,
                mailId:req.mailId,
                rating:req.rating,
                qualification:req.qualification,
                experience:req.experience
            }})
        if(response){
            return{
                statusCode:HttpStatus.OK,
                Message:"updated sucessfully",
                result:{
                    res:response
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
