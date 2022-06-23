import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuid}  from 'uuid'
import { Document } from "mongoose";

    @Schema()
    export class service extends Document{
        @Prop({required: true, unique: true, default: uuid})
        serviceId:string
        @Prop()
        name:string
        @Prop()
        mobileNum:string
        @Prop()
        mailId:string
        @Prop()
        rating:string
        @Prop()
        qualification:string
        @Prop()
        experience:string


    }
    export const serviceSchema=SchemaFactory.createForClass(service)
