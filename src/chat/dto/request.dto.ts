import { ApiProperty } from "@nestjs/swagger";

export class requestDto{
    @ApiProperty()
    requestId: string;
    @ApiProperty()
    request: string;
    @ApiProperty()
    providerId: string;
    @ApiProperty()
    vendorId: string;
}