import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
 

@Schema({timestamps: true})
export class products extends Document{
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