import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({timestamps: true})
export class vendor extends Document{
   @Prop()
   mailId:string
   @Prop()
   mobileNum:string
   @Prop()
   shopDetails:[]
   @Prop()
   addLocation:string
   @Prop()
   modeOfBussiness:string
   @Prop()
   blogPost:[]

     
}
export const vendorSchema=SchemaFactory.createForClass(vendor)
