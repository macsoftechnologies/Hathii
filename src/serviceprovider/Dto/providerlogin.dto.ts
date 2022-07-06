import { ApiProperty } from "@nestjs/swagger"

export class providerloginDto {
    @ApiProperty()
    email:string
    @ApiProperty()
    mobileNum:string
    @ApiProperty()
    password:string
  
}