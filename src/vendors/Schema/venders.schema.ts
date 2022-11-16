import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class vendor extends Document {
  @Prop({ required: true, unique: true, default: uuid })
  vendorId: string;
  @Prop()
  vendorName:string;
  @Prop()
  mobileNum: string;
  @Prop()
  email:string;
  @Prop()
  password: string;
  @Prop()
  shopName:string;
  @Prop()
  shopTimings: [];
  @Prop()
  addLocation: [];
  @Prop()
  modeOfBussiness: string;
  @Prop()
  Gstin:string;
  @Prop()
  shopProof:string;
  @Prop()
  blogPost: [];
  @Prop()
  shopPhoto: [];
  @Prop()
  color:[];
  @Prop()
  rating:string;
}
export const vendorSchema = SchemaFactory.createForClass(vendor);
