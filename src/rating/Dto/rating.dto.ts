import { ApiProperty } from "@nestjs/swagger"

export class ratingDto{
   @ApiProperty()
   ratingId: string
   @ApiProperty()
    buyerId:string
    @ApiProperty()
    responseRate:string
    @ApiProperty()
    rating:string
    @ApiProperty()
    trustRating:string
    @ApiProperty()
    vendorVerficationRating:string
    @ApiProperty()
    overallRating:string
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    productId:string
}