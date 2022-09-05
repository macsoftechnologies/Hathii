import { ApiProperty } from "@nestjs/swagger"

 
export class orderDto{
    @ApiProperty()
    orderId:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    orderQuantity:string
    @ApiProperty()
    time:string
    @ApiProperty()
    rewardpoints:string

}