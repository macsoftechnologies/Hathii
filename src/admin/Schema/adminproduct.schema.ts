import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import {v4 as uuid} from 'uuid'

@Schema({timestamps:true})
export class adminproduct extends Document{
    @Prop({required: true, default:uuid, unique:true})
    productId:string
    @Prop()
    productName:string
    @Prop()
    productDescription:string
    @Prop()
    productImage:string
    @Prop()
    adminProductId:string

}
export const adminproductSchema=SchemaFactory.createForClass(adminproduct)