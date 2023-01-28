import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({timestamps: true})

export class ProductRequest extends Document{
    @Prop({default: uuid})
    productRequestId: string
    @Prop()
    userId: string
    @Prop()
    vendorId: string
    @Prop()
    vendorProdId: string
    @Prop()
    quantity: string
    @Prop()
    orderTotalAmount: string
    @Prop({ default: 'pending', enum: ['pending', 'accepted'] })
    status:string
}

export const productRequestSchema = SchemaFactory.createForClass(ProductRequest);