import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import {v4 as uuid } from 'uuid'

@Schema({timestamps:true})
export class serviceProv extends Document{
    @Prop({required: true, unique: true, default: uuid})
    providerId:string
    @Prop()
    email:string
    @Prop()
    phoneNumber:string
    @Prop()
    name:string
    @Prop()
    experience:string
    @Prop()
    minwageRating:string
    @Prop()
    location:string
    @Prop()
    skills:string
    @Prop()
    rating:string
    @Prop()
    aadharNumber:string
    @Prop()
    labourcard:string
    @Prop()
    themeId: string

}
export const serviceProvSchema=SchemaFactory.createForClass(serviceProv)