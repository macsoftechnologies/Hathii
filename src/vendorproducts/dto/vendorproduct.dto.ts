import { ApiProperty } from "@nestjs/swagger";

export class vendorproductDto{
    @ApiProperty()
    vendorProdId:string
    @ApiProperty()
    vendorName:string
    @ApiProperty()
    productName:string
    @ApiProperty()
    price:string
    @ApiProperty()
    discount:string 
    @ApiProperty()
    finalPrice:string 
    @ApiProperty()
    shopType:string
    @ApiProperty()
    categoryId:string
    @ApiProperty()
    subCategoryId: string
    @ApiProperty()
    productDetails:{}
    @ApiProperty()
    policy: string
    @ApiProperty()
    description: string
    @ApiProperty()
    hold: number
    @ApiProperty()
    request: number
    @ApiProperty()
    availability: number
    @ApiProperty()
    quantity: number
}