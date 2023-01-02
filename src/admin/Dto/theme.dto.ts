import { ApiProperty } from "@nestjs/swagger";

export class themeDto{
    @ApiProperty()
    themeId: string;
    @ApiProperty()
    themeImage: [];
    @ApiProperty()
    themeColor: []
}