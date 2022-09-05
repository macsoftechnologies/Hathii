import { ApiProperty } from "@nestjs/swagger"

export class complaintDto{
    @ApiProperty()
    complaintId:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    feedback:string

}