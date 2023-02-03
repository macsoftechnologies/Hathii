import { ApiProperty } from "@nestjs/swagger"

enum status {
    'received'='received',
    'completed'='completed'
}
 
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
    vendorProductId: string
    @ApiProperty()
    vendorId: string
    @ApiProperty()
    status: string
}