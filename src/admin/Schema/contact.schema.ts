import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {v4 as uuid} from 'uuid'
import { Document } from "mongoose"

@Schema({timestamps:true})
export class contact extends Document{
  @Prop({required: true, default:uuid, unique:true})
  contactId:string
  @Prop()
  name:string
  @Prop()
  mailId:string
  @Prop()
  phoneNumber:string

}
export const contactSchema=SchemaFactory.createForClass(contact)