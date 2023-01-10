import { ApiProperty } from '@nestjs/swagger';

export class vendorDto {
  @ApiProperty()
  vendorId: string;
  @ApiProperty()
  vendorName:string;
  @ApiProperty()
  mobileNum: string;
  @ApiProperty()
  email:string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  shopName:string;
  @ApiProperty()
  shopTimings: [];
  @ApiProperty()
  addLocation: [];
  @ApiProperty()
  modeOfBussiness: string;
  @ApiProperty()
  Gstin:string;
  @ApiProperty()
  shopProof:string;
  @ApiProperty()
  blogPost: [];
  @ApiProperty()
  shopPhoto: [];
  @ApiProperty()
  color:[]
  @ApiProperty()
  themeId: string;
  @ApiProperty()
  rating:string;
}
