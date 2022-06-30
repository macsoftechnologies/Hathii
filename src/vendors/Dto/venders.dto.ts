import { ApiProperty } from "@nestjs/swagger";

export class vendorDto{
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    mailId:string
    @ApiProperty()
    mobileNum:string
    @ApiProperty()
    shopImages:[]
    @ApiProperty()
    addLocation:string
    @ApiProperty()
    modeOfBussiness:string
    @ApiProperty()
    blogPost:[]
    @ApiProperty()
    shopName:string
    @ApiProperty()
    shopTimings:string
    
    

  
}