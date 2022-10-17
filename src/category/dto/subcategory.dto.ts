import { ApiProperty } from "@nestjs/swagger";

export class subcategoryDto {
    @ApiProperty()
    subcategoryId: string
    @ApiProperty()
    subcategoryName: string
    @ApiProperty()
    categoryId: string
}