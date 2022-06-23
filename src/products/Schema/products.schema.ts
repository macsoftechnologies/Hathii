import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from "uuid";
 

@Schema({timestamps: true})
export class products extends Document{
    @Prop({required: true, unique: true, default: uuid})
    prodId:string
    @Prop()
    Name:string
    @Prop()
    Image:[]
    @Prop()
    productAvailable:string
    @Prop()
    Items:string
    @Prop()
    priceAfterDiscount:string
    
}

export  const productsSchema=SchemaFactory.createForClass(products)