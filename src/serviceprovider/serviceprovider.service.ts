import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { providerloginDto } from './Dto/providerlogin.dto';
import { serviceProvDto } from './Dto/serviceprovider.dto';
import { providerlogin } from './Schema/providerlogin.schema';
import { serviceProv } from './Schema/serviceprovider.schema';

@Injectable()
export class ServiceproviderService {
  
    constructor(@InjectModel(serviceProv.name) private serviceProvModel:Model<serviceProv> ,@InjectModel(providerlogin.name) private providerModel:Model<providerlogin>){}
   
    
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


            

//service provider login

// async Create(req: providerloginDto) {

//     try {
         
//         const registerRes = await this.providerModel.create(req)
//         if (registerRes) {
//             return {
//                 statusCode: HttpStatus.OK,
//                 message: "Registered SuccessFully",
//                 data: {
//                     authentication: {
//                         Email: registerRes.email,
//                         MobileNum: registerRes.mobileNum
//                     }
//                 }
//             }
          
//         }
//          return {
//             statusCode: HttpStatus.BAD_REQUEST,
//             message: "Invalid Request"
//         }

//     } catch (error) {
//         return {
//             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//             message: error.message,
//         };
//     }
// }

// async Login(req: providerloginDto) {
//     try {

//         const loginRes = await this.providerModel.findOne({ $or: [{ Email: req.email }, { MobileNum: req.mobileNum }] }).lean()
//         if (loginRes) {
//             if (loginRes.password === req.password) {

//                 return {
//                     statusCode: HttpStatus.OK,
//                     message: "Login SuccessFully",
//                     authentication: {
//                         Email: loginRes.email
//                     }
//                 }
//             }

//             return {
//                 statusCode: HttpStatus.UNAUTHORIZED,
//                 message: "Invalid Password"
//             }

//         }
//         return {
//             statusCode: HttpStatus.NOT_FOUND,
//             message: "User Not Found"

//         }
//     } catch (error) {
//         return {
//             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//             message: error.message,
//         };
//     }
// }



async  Create(req: providerloginDto){
    try{
        const registerRes = await this.providerModel.create(req)
        if(registerRes){
            return{
                statusCode: HttpStatus.OK,
                message: "admin  Registered Successfully",
                data:{
                    authentication:{
                        respons: registerRes
                    }
                }
             }
         }
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request"
            }
        }catch(error){
            return{
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
         }
    }

    async loginProvider(req: providerloginDto){
        try {
            const loginRes = await this.providerModel.findOne({ $or: [{email: req.email}, { password: req.password},{mobileNum:req.mobileNum}]}).lean()
           if(loginRes){
            if(loginRes.password === req.password){
                return {
                    
                    statusCode: HttpStatus.OK,
                    message:"Login SuccessFull",
                    login: loginRes
                      }
            }
         return{
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Invalid Password"
        }
     }
    
      return{
      statusCode: HttpStatus.UNAUTHORIZED,
      message: "provider  not found"
     }
        } catch(error){
            return{
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
     }   

}
