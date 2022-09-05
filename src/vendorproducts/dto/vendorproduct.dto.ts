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
    category:string
    @ApiProperty()
    categoryId:string
    @ApiProperty()
    specifications:{}

    
}