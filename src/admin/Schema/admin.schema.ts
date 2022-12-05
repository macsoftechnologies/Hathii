import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from "uuid";

@Schema({timestamps: true})
export class admin extends Document{
    @Prop({default: uuid})
    adminId: string

    @Prop()
    email:string

    @Prop()
    password:string

    @Prop()
    mobileNum:string
}

export const adminSchema=SchemaFactory.createForClass(admin)