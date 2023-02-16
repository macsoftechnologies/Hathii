import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { v4 as uuid } from "uuid"

@Schema({timestamps:true})
export class rating  extends Document{
   @Prop({required: true, default:uuid, unique:true})
   ratingId: string
   @Prop()
   userId:string
   @Prop()
   responseRate:number
   @Prop()
   rating:string
   @Prop()
   trustRating:string
   @Prop()
   vendorVerficationRating:number
   @Prop()
   overallRating:number
   @Prop()
   vendorId:string
   @Prop()
   vendorProductId:string
   @Prop()
   averageRating: number
   @Prop({required: true})
   role: string
}

export const ratingSchema=SchemaFactory.createForClass(rating)
