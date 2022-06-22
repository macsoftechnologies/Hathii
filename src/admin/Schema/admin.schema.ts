import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({timestamps: true})
export class admin extends Document{
    @Prop()
    email:string

    @Prop()
    password:string

    @Prop()
    mobileNum:string

}
export const adminSchema=SchemaFactory.createForClass(admin)