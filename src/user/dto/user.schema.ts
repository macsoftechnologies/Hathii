import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import {  v4 as uuid } from "uuid";

@Schema({timestamps:true})
export class user extends Document{

   //services
   @Prop({default:uuid})
   serviceId:string
   @Prop()
   userName:string
    @Prop()
    name:string
    @Prop()
    mobileNumber:string
    @Prop()
    email:string
    @Prop()
    rating:string
    @Prop()
    qualification:string
    @Prop()
    experience:string
    //serviceProvider  
   @Prop({default:uuid})
   providerId:string
    @Prop()
    minwageRating:string
    @Prop()
    location:string
    @Prop()
    skills:string
    @Prop()
    aadharNumber:string
    @Prop()
    labourcard:string
    @Prop()
    themeId: string
    //users 
    @Prop({default:uuid})
    userId:string
    @Prop()
    firstName: string
    @Prop()
    lastName: string
    
    @Prop()
    password: string
    @Prop()
    contactNumber: string
    @Prop()
    address: string
    
     //vendorSchema
     @Prop({default:uuid})
     vendorId:string;

  @Prop()
  vendorName:string;
   @Prop()
  shopName:string;
  @Prop()
  shopTimings: [];
  @Prop()
  addLocation: [];
  @Prop()
  modeOfBussiness: string;
  @Prop()
  Gstin:string;
  @Prop()
  shopProof:string;
  @Prop()
  blogPost: [];
  @Prop()
  shopPhoto: [];
  @Prop()
  color:[];
  @Prop({enum:['service','user','vendor','serviceprovider','admin']})
  role:string
  @Prop({ default: 'active', enum: ['active', 'suspend'] })
  status:string
}
 
export const UserSchema=SchemaFactory.createForClass(user)
