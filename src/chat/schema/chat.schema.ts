import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Chat extends Document{
    @Prop({default: uuid})
    chatId: string;
    @Prop()
    to: string;
    @Prop()
    from: string;
    @Prop()
    date: string;
    @Prop()
    time: string;
    @Prop()
    message: string
}

export const chatSchema = SchemaFactory.createForClass(Chat);