import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({timestamps:true})
export class providerlogin extends Document{
    @Prop()
    email:string
    @Prop()
    mobileNum:string
    @Prop()
    password:string
  
}
export const providerloginSchema=SchemaFactory.createForClass(providerlogin)
