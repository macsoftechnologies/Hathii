import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/shared/shared.service';
import {   loginDto , userDto } from './dto/user.dto';
import { user } from './dto/user.schema';
 


@Injectable()
export class UserService {
 
   
    constructor(@InjectModel(user.name) private UserModel:Model<user>,
     private sharedService:SharedService){}

  async create(params:userDto,image?:any):Promise<any>{
      try{
        console.log(image)
        if (image) {
            if (image.shopPhoto && image.shopPhoto[0]) {
              const attachmentFile = await this.sharedService.saveFile(
                image.shopPhoto[0],
              );
              params.shopPhoto = attachmentFile;
            }
            if (image.blogPost && image.blogPost[0]) {
              const attachmentFile = await this.sharedService.saveFile(
                image.blogPost[0],
              );
    
              params.blogPost = attachmentFile;
            }
            if (image.color && image.color[0]) {
              const attachmentFile = await this.sharedService.saveFile(
                image.color[0],
              );
              params.color = attachmentFile;
            }
            if (image.labourcard && image.labourcard[0]) {
                const attachmentFile = await this.sharedService.saveFile(
                  image.labourcard[0],
                );
                params.labourcard= attachmentFile;
              }
          }

        

        let userObject:any={};
        if(params.role==='serviceprovider'){
          userObject.providerId=params.providerId,
          userObject.userName=params.userName,
           userObject.name=params.name,
           userObject.email=params.email,
           userObject.mobileNumber=params.mobileNumber,
           userObject.experience=params.experience,
           userObject.minwageRating=params.minwageRating,
           userObject.location=params.location,
           userObject.skills=params.skills,
           userObject.aadharNumber=params.aadharNumber,
           userObject.labourcard=params.labourcard,
           userObject.rating=params.rating,
           userObject.themeId=params.themeId,
           userObject.password=params.password
        }
        if(params.role==='vendor'){
          userObject.vendorId=params.vendorId,
          userObject.userName=params.userName,
            userObject.vendorName=params.vendorName,
            userObject.shopName=params.shopName,
            userObject.modeOfBussiness=params.modeOfBussiness,
            userObject.Gstin=params.Gstin,
            userObject.shopProof=params.shopProof,
            userObject.color=params.color,
            userObject.shopPhoto=params.shopPhoto,
            userObject.blogPost=params.blogPost,
            userObject.mobileNumber=params.mobileNumber,
            userObject.email=params.email,
            userObject.password=params.password,
            userObject.shopTimings=params.shopTimings,
            userObject.addLocation=params.addLocation,
            userObject.themeId=params.themeId,
            userObject.rating=params.rating

         }

        if(params.role==='service'){
          userObject.serviceId=params.userId,
            userObject.userName=params.userName,
            userObject.name=params.name,
            userObject.mobileNumber=params.mobileNumber,
            userObject.email=params.email,
            userObject.rating=params.rating,
            userObject.qualification=params.qualification,
            userObject.experience=params. experience,
            userObject.password=params.password
        }
        if(params.role==='user'){
          userObject.userId=params.userId,
            userObject.userName=params.userName,
            userObject.firstName=params.firstName,
            userObject.lastName=params.lastName,
            userObject.email=params.email,
            userObject.password=params.password,
            userObject.address=params.address
             
        }

        let createUserRes;
        if(params.role==='service' || params.role==='user' || params.role==='serviceprovider' ||  params.role==='vendor'){
            let filterObject:any={
              role:params.role,
                 ...userObject


            }
            console.log("filterObjet",filterObject)
            console.log("service",filterObject)
            createUserRes=await this.UserModel.create(filterObject);
          }else{
               createUserRes=await this.UserModel.create(params)
               console.log(params)
          }
          
          
        let response={
            statusCode:HttpStatus.OK,
            message:'user created Sucessfully',
            data:createUserRes
        }
        return response
      }catch(error){
          return{
              statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
              message:error

          }
      }
  }


   

  async loginUser(req: userDto){
    try {
       // const loginRes = await this.UserModel.findOne({ $or: [{userName: req.userName}, { password: req.password}]}).lean()
       const loginRes=await this.UserModel.findOne({mobileNumber:req.mobileNumber,role:req.role})
       if(loginRes){
       // if(loginRes.password === req.password){
          
          return {
                
                statusCode: HttpStatus.OK,
                message:"Login SuccessFull",
                login: loginRes,
                
                  }
      
     return{
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Invalid Password"
    }
 }

  return{
  statusCode: HttpStatus.UNAUTHORIZED,
  message: "user  not found"
 }
    } catch(error){
        return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        }
    }
 }   

     async deleteuser(id:string ){
      try{
        const delUser=await this.UserModel.deleteOne({_id:id})
        if(delUser){
          return{
            statusCode:HttpStatus.OK,
            message:'deleted sucessfully',
            del:delUser
          }
        }
      }catch(error){
        return {
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          message:error
        }
      }
     }

     
  }

  
    
