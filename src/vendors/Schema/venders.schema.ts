import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class vendor extends Document {
  @Prop({ required: true, unique: true, default: uuid })
  vendorId: string;
  @Prop()
  mailId: string;
  @Prop()
  mobileNum: string;
  @Prop()
  shopDetails: [];
  @Prop()
  addLocation: [];
  @Prop()
  modeOfBussiness: string;
  @Prop()
  blogPost: [];
  @Prop()
  shopPhoto: string;
}
export const vendorSchema = SchemaFactory.createForClass(vendor);
