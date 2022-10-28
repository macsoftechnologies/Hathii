import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })

export class userRating extends Document{
    @Prop({default: uuid})
    userRatingId: string;
    @Prop()
    vendorId: string;
    @Prop()
    userRating: string;
    @Prop()
    comment: string
}

export const userRatingSchema = SchemaFactory.createForClass(userRating);