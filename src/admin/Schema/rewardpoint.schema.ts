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
    rewardpoints:string
    @Prop({required: true})
    role: string
}

export const rewardpointSchema=SchemaFactory.createForClass(rewardpoint)
