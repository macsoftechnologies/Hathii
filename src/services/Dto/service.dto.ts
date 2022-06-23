import { ApiProperty } from "@nestjs/swagger";

export class serviceDto{
    @ApiProperty()
    serviceId:string
    @ApiProperty()
    name:string
    @ApiProperty()
    mobileNum:string
    @ApiProperty()
    mailId:string
    @ApiProperty()
    rating:string
    @ApiProperty()
    qualification:string
    @ApiProperty()
    experience:string


}