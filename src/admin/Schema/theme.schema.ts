import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Theme extends Document{
    @Prop({default: uuid})
    themeId: string;
    @Prop()
    themeImage: [];
    @Prop()
    themeColor: []
}

export const themeSchema = SchemaFactory.createForClass(Theme);