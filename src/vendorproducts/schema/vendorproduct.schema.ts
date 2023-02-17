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
    productImage: []
    @Prop()
    price:number
    @Prop()
    discount:number 
    @Prop()
    finalPrice:number 
    @Prop()
    longitude: []
    @Prop()
    latitude: []
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