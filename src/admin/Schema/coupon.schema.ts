import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Coupon extends Document{
    @Prop({default: uuid})
    couponId: string;
    @Prop()
    couponAmount: string;
    @Prop()
    description: string;
    @Prop()
    userName: string;
    @Prop()
    coupons: string
}

export const couponSchema = SchemaFactory.createForClass(Coupon);