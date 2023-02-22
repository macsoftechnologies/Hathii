import { ApiProperty } from "@nestjs/swagger";

export class adminproductDto{
    @ApiProperty()
    productId:string
    @ApiProperty()
    vendorId: string
    @ApiProperty()
    categoryId: string
    @ApiProperty()
    productName:string
    @ApiProperty()
    productDescription:string
    @ApiProperty()
    productImage:string
    @ApiProperty()
    adminProductId:string
    @ApiProperty()
    specifications: {}
    @ApiProperty()
    price: number
    @ApiProperty()
    quantity: number
    @ApiProperty()
    discount: number
    @ApiProperty()
    finalPrice: number
}