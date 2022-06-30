import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { vendorDto } from "./Dto/venders.dto";
import { vendor } from "./Schema/venders.schema";
 
@Injectable()
export class VendorsService {
    constructor(@InjectModel(vendor.name) private vendorModel: Model<vendor>){}


 
    

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



async deleteVen(req:vendorDto){
    try{
        const vend=await this.vendorModel.deleteOne({vendorId:req.vendorId})
        if(vend){
            return{
            statusCode:HttpStatus.OK,
            Message:'deleted Sucessfully',
            data:{
                vend
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

async upadateVen(req:vendorDto){
    try{
        const editVen=await this.vendorModel.updateOne({vendorId:req.vendorId})
        if(editVen){
            return{
                statusCode:HttpStatus.OK,
                Message:'updated sucessfully',
                res:{
                    editVen
                }
            }
        }
    }catch(error){
        return{
            stausCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
        }
    }
}

}