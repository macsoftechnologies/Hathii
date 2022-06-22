import { ApiProperty } from "@nestjs/swagger"

export class adminDto{
    @ApiProperty()
    email:string
    @ApiProperty()
    password:string
    @ApiProperty()
    mobileNum:string

}