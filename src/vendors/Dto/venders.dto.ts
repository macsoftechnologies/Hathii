import { ApiProperty } from '@nestjs/swagger';

export class vendorDto {
  @ApiProperty()
  vendorId: string;
  @ApiProperty()
  vendorName:string
  @ApiProperty()
  mobileNum: string;
  @ApiProperty()
  email:string
  @ApiProperty()
  shopName:string
  @ApiProperty()
  shopTimings: [];
  @ApiProperty()
  addLocation: [];
  @ApiProperty()
  modeOfBussiness: string;
  @ApiProperty()
  Gstin:string
  @ApiProperty()
  shopProof:string
  @ApiProperty()
  blogPost: [];
  @ApiProperty()
  shopPhoto: string;
  @ApiProperty()
  color:[]
  @ApiProperty()
  rating:string 

}
