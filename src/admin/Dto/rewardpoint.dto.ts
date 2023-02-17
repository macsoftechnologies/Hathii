import { ApiProperty } from "@nestjs/swagger"

export class rewardpointDto{
    @ApiProperty()
    rewardId:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    rewardpoints:string
    @ApiProperty()
    role: string
}