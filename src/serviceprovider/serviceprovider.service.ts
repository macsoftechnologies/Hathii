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
   
    
    async addserviceProd(req:serviceProvDto, image) {
        try {
            console.log(req, "documents...", image)
            if (image) {
                const reqDoc = image.map((doc, index) => {
                    let IsPrimary = false
                    if (index == 0) {
                        IsPrimary = true
                    }
                    const randomNumber = Math.floor((Math.random() * 1000000) + 1);
                    return doc.filename
                })

                req.labourcard = reqDoc.toString()
            }
            console.log(req);
            // return false;
            const serviceProd = await this.serviceProvModel.create(req)

            if (serviceProd) {
                return {
                    statusCode: HttpStatus.OK,
                     serviceProduct: serviceProd
                    
                     
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request"
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
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
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        }catch(error){
            return{
                satusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error

            }
        }
      }

 


      async ProviderById(req:serviceProvDto){
        try{
            const provRes=await this.serviceProvModel.find({providerId:req.providerId})
            if(provRes){
                return{
                    statusCode:HttpStatus.OK,
                    result:{
                        provRes
                    }
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }



    async editserviceProd(req:serviceProvDto, image) {
        try {
            console.log(req, "documents...", image)
            if (image) {
                const reqDoc = image.map((doc, index) => {
                    let IsPrimary = false
                    if (index == 0) {
                        IsPrimary = true
                    }
                    const randomNumber = Math.floor((Math.random() * 1000000) + 1);
                    return doc.filename
                })

                req.labourcard = reqDoc.toString()
            }
            console.log(req);
            // return false;
            const serviceProd = await this.serviceProvModel.updateOne({providerId:req.providerId},{$set:{ email:req.email, phoneNumber:req.phoneNumber, name:req.name,
                experience:req.experience,  minwageRating: req.minwageRating, location: req.location, skills: req.skills, rating: req.rating, aadharNumber:req.aadharNumber, labourcard: req.labourcard}})
               

            if (serviceProd) {
                return {
                    statusCode: HttpStatus.OK,
                    Message:'updated sucessfully',
                     serviceProduct: serviceProd
                    
                     
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request"
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }



     
        // async updateProv(req:serviceProvDto){

        //     try{
        //         const response=await this.serviceProvModel.updateOne({providerId:req.providerId},{$set:{ email:req.email, phoneNumber:req.phoneNumber, name:req.name,
        //             experience:req.experience,  minwageRating: req.minwageRating, location: req.location, skills: req.skills, rating: req.rating, aadharNumber:req.aadharNumber, labourcard: req.labourcard}})
                   
        //         if(response){
        //             return{
        //                 statusCode:HttpStatus.OK,
        //                 Message:"updated sucessfully",
        //                 result:{
        //                     res:response
        //                 }
        //             }
        //         }
        //     }catch(error){
        //         return{
        //             statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        //             Message:error
        //         }
        //     }
        // }


        
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
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
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
            const loginRes = await this.providerModel.findOne({ $or: [{email: req.email},{mobileNum:req.mobileNum}]}).lean()
           if(loginRes){
            if(loginRes.password === req.password){
                return {
                    
                    statusCode: HttpStatus.OK,
                    message:"Login SuccessFull",
                    // login: loginRes
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
