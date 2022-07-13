import { ApiProperty } from '@nestjs/swagger';

export class vendorDto {
  @ApiProperty()
  vendorId: string;
  @ApiProperty()
  mailId: string;
  @ApiProperty()
  mobileNum: string;
  @ApiProperty()
  shopDetails: [];
  @ApiProperty()
  addLocation: string;
  @ApiProperty()
  modeOfBussiness: string;
  @ApiProperty()
  blogPost: [];
  @ApiProperty()
  shopPhoto: string;
}
