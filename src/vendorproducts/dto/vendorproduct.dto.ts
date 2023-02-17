import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class vendorproductDto{
    @ApiProperty()
    vendorProdId:string
    @ApiProperty()
    vendorId: string
    @ApiProperty()
    vendorName:string
    @ApiProperty()
    productName:string
    @ApiProperty()
    productImage: []
    @ApiProperty()
    price:number
    @ApiProperty()
    discount:number 
    @ApiProperty()
    finalPrice:number
    @ApiProperty()
    longitude: []
    @ApiProperty()
    latitude: []
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