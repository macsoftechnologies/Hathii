import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { adminDto } from './Dto/admin.dto';
import { admin } from './Schema/admin.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(admin.name) private adminModel: Model<admin>){}

    async  Create(req: adminDto){
        try{
            const registerRes = await this.adminModel.create(req)
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
 
        async loginAdmin(req: adminDto){
            try {
                const loginRes = await this.adminModel.findOne({ $or: [{email: req.email}, { password: req.password},{mobileNum:req.mobileNum}]}).lean()
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
          message: "admin  not found"
         }
            } catch(error){
                return{
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message
                }
            }
         }   
 


    
}
