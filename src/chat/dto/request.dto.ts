import { ApiProperty } from "@nestjs/swagger";

export class requestDto{
    @ApiProperty()
    requestId: string;
    @ApiProperty()
    productId: string;
    @ApiProperty()
    productName: string;
    @ApiProperty()
    quantity: string;
    @ApiProperty()
    providerId: string;
    @ApiProperty()
    vendorId: string;
    @ApiProperty()
    mailId: string;
    @ApiProperty()
    request: string;
    @ApiProperty()
    mobileNumber: string;
}