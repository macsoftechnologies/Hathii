import { ApiProperty } from "@nestjs/swagger";

export class reviewDto{
    @ApiProperty()
    reviewId: string
    @ApiProperty()
    userId: string
    @ApiProperty()
    review: string
}