import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { vendorDto } from "./Dto/venders.dto";
import { vendor } from "./Schema/venders.schema";
 
@Injectable()
export class VendorsService {
    constructor(@InjectModel(vendor.name) private vendorModel: Model<vendor>){}


 async createVendor(req:vendorDto){
    try{
   const result=await this.vendorModel.create(req)
   if(result){
    return{
        statusCode:HttpStatus.OK,
        Message:'vendor created sucessfully',
        Vendor:{
            data:result
        }
    }
   }
    }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            message:error
        }
    }
 }


async getVendor(){
    try{
        const data=await this.vendorModel.find()
        if(data){
            return{
                statusCode:HttpStatus.OK,
                Message:'vendors list ',
                item:{
                  list:data  
                }
            }
        }
    }catch(error){
        return{
            statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            message:error
            
        }
    }
}

}