import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import {v4 as uuid} from  'uuid'

@Schema({timestamps:true})
export class complaint extends Document{
   @Prop({required: true, default:uuid, unique:true})
   complaintId:string
    @Prop()
    userId:string
    @Prop()
    vendorId:string
    @Prop()
    complaint:string
}

export const complaintSchema=SchemaFactory.createForClass(complaint)
