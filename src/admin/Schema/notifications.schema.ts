import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Notification extends Document{
    @Prop({default: uuid})
    notificationId: string;
    @Prop()
    vendorId: string;
    @Prop()
    providerId: string;
    @Prop()
    notification: string;
    @Prop()
    token: string
}

export const notificationSchema = SchemaFactory.createForClass(Notification);