import { ApiProperty } from "@nestjs/swagger"

export class ratingDto{
   @ApiProperty()
   ratingId: string
   @ApiProperty()
    userId:string
    @ApiProperty()
    responseRate:number
    @ApiProperty()
    rating:string
    @ApiProperty()
    trustRating:string
    @ApiProperty()
    vendorVerficationRating:number
    @ApiProperty()
    overallRating:number
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    vendorProductId:string
    @ApiProperty()
    averageRating: number
    @ApiProperty()
    role: string
}