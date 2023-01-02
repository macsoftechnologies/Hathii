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
    @ApiProperty()
    date:string
    @ApiProperty()
    productId: string
    @ApiProperty()
    vendorId: string
    @ApiProperty()
    status: string
}