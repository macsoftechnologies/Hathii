import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Request extends Document{
    @Prop({default: uuid})
    requestId: string;
    @Prop()
    productId: string;
    @Prop()
    productName: string;
    @Prop()
    quantity: string;
    @Prop()
    providerId: string;
    @Prop()
    vendorId: string;
    @Prop()
    mailId: string;
    @Prop()
    request: string;
    @Prop()
    mobileNumber: string;
}

export const requestSchema = SchemaFactory.createForClass(Request);