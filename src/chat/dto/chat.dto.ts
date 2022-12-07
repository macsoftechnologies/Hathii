import { ApiProperty } from "@nestjs/swagger";

export class chatDto{
    @ApiProperty()
    chatId: string;
    @ApiProperty()
    to: string;
    @ApiProperty()
    from: string;
    @ApiProperty()
    date: string;
    @ApiProperty()
    time: string;
    @ApiProperty()
    message: string
}