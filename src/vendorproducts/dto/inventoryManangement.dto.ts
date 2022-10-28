import { ApiProperty } from "@nestjs/swagger";

export class inventoryManagementDto{
    @ApiProperty()
    inventoryManagementId: string;
    @ApiProperty()
    vendorProdId: string;
    @ApiProperty()
    openingStock: number;
    @ApiProperty()
    sale: number;
    @ApiProperty()
    closingStock: number
}