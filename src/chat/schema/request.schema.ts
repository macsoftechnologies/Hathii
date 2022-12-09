import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Request extends Document{
    @Prop({default: uuid})
    requestId: string;
    @Prop()
    request: string;
    @Prop()
    providerId: string;
    @Prop()
    vendorId: string;
}

export const requestSchema = SchemaFactory.createForClass(Request);