import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class inventoryManagement extends Document {
  @Prop({ default: uuid })
  inventoryManagementId: string;
  @Prop()
  vendorProdId: string;
  @Prop()
  openingStock: number;
  @Prop()
  sale: number;
  @Prop()
  closingStock: number;
  @Prop()
  date: string;
  @Prop()
  time: string;
}

export const inventoryManagementSchema =
  SchemaFactory.createForClass(inventoryManagement);
