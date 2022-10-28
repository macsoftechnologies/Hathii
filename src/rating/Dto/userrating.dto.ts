import { ApiProperty } from "@nestjs/swagger";

export class userRatingDto{
    @ApiProperty()
    userRatingId: string;
    @ApiProperty()
    vendorId: string;
    @ApiProperty()
    userRating: string;
    @ApiProperty()
    comment: string
}