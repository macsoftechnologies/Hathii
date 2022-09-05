import { ApiProperty } from "@nestjs/swagger"

export class contactDto{
    @ApiProperty()
    contactId:string
    @ApiProperty()
    name:string
    @ApiProperty()
    mailId:string
    @ApiProperty()
    phoneNumber:string
}