import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class review extends Document{
    @Prop({ default: uuid })
    reviewId: string
    @Prop()
    userId: string
    @Prop()
    review: string
}

export const reviewSchema = SchemaFactory.createForClass(review);