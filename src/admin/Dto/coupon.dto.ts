import { ApiProperty } from "@nestjs/swagger";

export class couponDto{
    @ApiProperty()
    couponId: string;
    @ApiProperty()
    couponAmount: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    userName: string;
    @ApiProperty()
    coupons: string
}