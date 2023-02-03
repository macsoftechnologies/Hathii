import { ApiProperty } from '@nestjs/swagger';

enum status {
  'pending' = 'pending',
  'accepted' = 'accepted',
}

export class productRequestDto {
  @ApiProperty()
  productRequestId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  vendorId: string;
  @ApiProperty()
  vendorProductId: string;
  @ApiProperty()
  quantity: string;
  @ApiProperty()
  orderTotalAmount: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  time: string;
  @ApiProperty()
  updatedDate: string;
  @ApiProperty()
  updatedTime: string;
}
