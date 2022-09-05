import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import {v4 as uuid} from  'uuid'

@Schema({timestamps:true})
export class rewardpoint  extends Document{
    @Prop({required: true, default:uuid, unique:true})
    rewardId:string
    @Prop()
    userId:string
    @Prop()
    vendorId:string
    @Prop()
    rewardpoints:string
}

export const rewardpointSchema=SchemaFactory.createForClass(rewardpoint)
