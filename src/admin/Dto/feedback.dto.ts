import { ApiProperty } from "@nestjs/swagger"

export class feedbackDto{
    @ApiProperty()
    feedbackId:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    feedback:string

}