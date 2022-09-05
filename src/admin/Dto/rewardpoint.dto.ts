import { ApiProperty } from "@nestjs/swagger"

export class rewardpointDto{
    @ApiProperty()
    rewardId:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    rewardpoints:string

}