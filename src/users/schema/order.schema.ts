import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import {v4 as uuid} from 'uuid'

@Schema({timestamps:true})
export class order extends Document{
    @Prop({required: true, default:uuid, unique:true})
    orderId:string
    @Prop()
    userId:string
    @Prop()
    orderQuantity:string
    @Prop()
    time:string
    @Prop()
    rewardPoints: string
    @Prop()
    date:string
    @Prop()
    vendorProductId: string
    @Prop()
    vendorId: string
    @Prop({ default: 'received', enum: ['received', 'accepted', 'completed'] })
    status:string
}

export const orderSchema=SchemaFactory.createForClass(order)