import { ApiProperty } from "@nestjs/swagger"

export class adminDto{
    @ApiProperty()
    adminId: string
    @ApiProperty()
    email:string
    @ApiProperty()
    password:string
    @ApiProperty()
    mobileNum:string
    

}