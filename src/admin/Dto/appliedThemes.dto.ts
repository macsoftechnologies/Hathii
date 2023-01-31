import { ApiProperty } from "@nestjs/swagger";

export class appliedThemesDto{
    @ApiProperty()
    appliedThemeId: string
    @ApiProperty()
    userId: string
    @ApiProperty()
    vendorId: string
}