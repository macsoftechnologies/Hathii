import { ApiProperty } from "@nestjs/swagger";

export class notificationsDto{
    @ApiProperty()
    notificationId: string;
    @ApiProperty()
    vendorId: string;
    @ApiProperty()
    providerId: string;
    @ApiProperty()
    notification: string;
    @ApiProperty()
    token: string
}