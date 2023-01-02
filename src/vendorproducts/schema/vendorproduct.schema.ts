import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose'
import {v4 as uuid} from 'uuid'
 
@Schema()
export class productDetails{}

@Schema({timestamps:true})
export class vendorproduct extends Document{
    @Prop({required: true, unique: true, default: uuid})
    vendorProdId:string
    @Prop()
    vendorId: string
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
    shopType:string
    @Prop()
    categoryId:string
    @Prop()
    subCategoryId: string
    @Prop({trim: true, strict:true, type:productDetails})
    productDetails:{
        type:any 
    }
    @Prop()
    policy: string
    @Prop()
    description: string
    @Prop()
    hold: number
    @Prop()
    request: number
    @Prop()
    availability: number
    @Prop()
    quantity: number
}

export const vendorproductSchema=SchemaFactory.createForClass(vendorproduct)