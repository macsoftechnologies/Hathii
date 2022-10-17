import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class Subcategory extends Document{
    @Prop({default: uuid})
    subcategoryId: string
    @Prop()
    subcategoryName: string
    @Prop()
    categoryId: string
}

export const subcategorySchema = SchemaFactory.createForClass(Subcategory);