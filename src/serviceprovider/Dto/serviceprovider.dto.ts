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
    minwageRating:string
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
    @ApiProperty()
    themeId: string
    
}


