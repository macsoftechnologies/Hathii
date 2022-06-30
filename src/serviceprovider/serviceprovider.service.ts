import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { serviceProvDto } from './Dto/serviceprovider.dto';
 
import { serviceProv } from './Schema/serviceprovider.schema';

@Injectable()
export class ServiceproviderService {
  
    constructor(@InjectModel(serviceProv.name) private serviceProvModel:Model<serviceProv> ){}
   
    
    async CreateServiceProv(req:serviceProvDto){
        try{
            const  createser=await this.serviceProvModel.create(req)
            if(createser){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'Registred sucesfully',
                    createSer:createser
                    
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }


     
    
      async getProvider(){

        try{
            const data=await this.serviceProvModel.find()
            if(data){
                return{
                    statusCode:HttpStatus.OK,
                    Message:'List of serviceProviders',
                    Data:{
                        result:data
                    }

                }
            }
        }catch(error){
            return{
                satusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error

            }
        }
      }



      async ProviderById(id:string){
        try{
            const provRes=await this.serviceProvModel.findById(id)
            if(provRes){
                return{
                    statusCode:HttpStatus.OK,
                    result:{
                        provRes
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


     
        async updateProv(req:serviceProvDto){

            try{
                const response=await this.serviceProvModel.updateOne({providerId:req.providerId})
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


        
      async deleteProv(req:serviceProvDto){

        try{
            const delservice=await this.serviceProvModel.deleteOne({providerId:req.providerId})
            if(delservice){
                return{
                statusCode:HttpStatus.OK,
                message:'deleted sucessfully',
                data:{
                    Del:delservice
                }
            } 

            }
        }catch(error){
            return{
                statuCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
      }


            
}
