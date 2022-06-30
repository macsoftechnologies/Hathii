import { ApiProperty } from "@nestjs/swagger"

export class serviceProvDto{
    @ApiProperty()
    providerId:string
    @ApiProperty()
    email:string
    @ApiProperty()
    phoneNumber:string
    @ApiProperty()
    name:string
    @ApiProperty()
    experience:string
    @ApiProperty()
    qualification:string
    @ApiProperty()
    location:string
    @ApiProperty()
    skills:string
    @ApiProperty()
    rating:string
    @ApiProperty()
    aadharNumber:string
    @ApiProperty()
    labourcard:string
    
    
}


