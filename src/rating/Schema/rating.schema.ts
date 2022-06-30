import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({timestamps:true})
export class rating  extends Document{
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
   
 
}

export const ratingSchema=SchemaFactory.createForClass(rating)
