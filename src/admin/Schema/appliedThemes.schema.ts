import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({timestamps: true})

export class appliedTheme extends Document{
    @Prop({default: uuid})
    appliedThemeId: string
    @Prop()
    userId: string
    @Prop()
    vendorId: string
}

export const appliedThemeSchema = SchemaFactory.createForClass(appliedTheme);