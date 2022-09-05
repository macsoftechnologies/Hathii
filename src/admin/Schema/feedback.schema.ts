import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import {v4 as uuid} from  'uuid'

@Schema({timestamps:true})
export class feedback extends Document{
   @Prop({required: true, default:uuid, unique:true})
   feedbackId:string
    @Prop()
    userId:string
    @Prop()
    vendorId:string
    @Prop()
    feedback:string
}

export const feedbackSchema=SchemaFactory.createForClass(feedback)
