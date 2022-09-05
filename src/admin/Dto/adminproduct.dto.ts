import { ApiProperty } from "@nestjs/swagger";

export class adminproductDto{
    @ApiProperty()
    productId:string
    @ApiProperty()
    productName:string
    @ApiProperty()
    productDescription:string
    @ApiProperty()
    productImage:string
    @ApiProperty()
    adminProductId:string
    
}