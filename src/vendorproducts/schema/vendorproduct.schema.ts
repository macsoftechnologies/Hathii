import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose'
import {v4 as uuid} from 'uuid'
 
@Schema()
export class specifications{}

@Schema({timestamps:true})
export class vendorproduct extends Document{
    @Prop({required: true, unique: true, default: uuid})
    vendorProdId:string
    @Prop()
    vendorName:string
    @Prop()
    productName:string
    @Prop()
    price:string
    @Prop()
    discount:string 
    @Prop()
    finalPrice:string 
    @Prop()
    category:string
    @Prop()
    categoryId:string
    @Prop({trim: true,strict:true,type:specifications})
    specifications:{
        type:any 
    }
}

export const vendorproductSchema=SchemaFactory.createForClass(vendorproduct)