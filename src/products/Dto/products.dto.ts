import { ApiProperty } from "@nestjs/swagger";

export class productsDto{
    @ApiProperty()
    Name:string
    @ApiProperty()
    Image:[]
    @ApiProperty()
    productAvailable:string
    @ApiProperty()
    Items:string
    @ApiProperty()
    priceAfterDiscount:string
    

}