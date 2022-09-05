import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { v4 as uuid } from "uuid"

@Schema({timestamps:true})
export class rating  extends Document{
   @Prop({required: true, default:uuid, unique:true})
   ratingId: string
   @Prop()
   buyerId:string
   @Prop()
   responseRate:string
   @Prop()
   rating:string
   @Prop()
   trustRating:string
   @Prop()
   vendorVerficationRating:string
   @Prop()
   overallRating:string
   @Prop()
   vendorId:string
   @Prop()
   productId:string
   
   
 
}

export const ratingSchema=SchemaFactory.createForClass(rating)
