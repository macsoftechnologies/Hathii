import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import {v4 as uuid} from 'uuid'

@Schema()
export class specifications{}

@Schema({timestamps:true})
export class adminproduct extends Document{
    @Prop({required: true, default:uuid, unique:true})
    productId:string
    @Prop()
    vendorId: string
    @Prop()
    categoryId: string
    @Prop()
    productName:string
    @Prop()
    productDescription:string
    @Prop()
    productImage:string
    @Prop()
    adminProductId:string
    @Prop({trim: true,strict:true,type:specifications})
    specifications:{
        type:any 
    }
    @Prop()
    price: number
    @Prop()
    quantity: number
    @Prop()
    discount: number
    @Prop()
    finalPrice: number
}
export const adminproductSchema=SchemaFactory.createForClass(adminproduct)