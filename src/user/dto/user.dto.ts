import { ApiProperty, IntersectionType } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"

enum role {
    'admin'='admin',
    'user'='user',
    'vendor'='vendor',
    'serviceprovider'='serviceprovider',
    'service'='service'
}
enum status {
    'active'='active',
    'suspend'='suspend',
     
}

export class loginDto{
    @ApiProperty()
    userName:string
    @ApiProperty()
    email:string
    @ApiProperty()
    password:string
    @ApiProperty()
    mobileNumber:string
    @ApiProperty()
    @IsEnum(role)
    role:string
    
}

 
export class userDto  {
    @ApiProperty()
    serviceId:string
    @ApiProperty()
    providerId:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    vendorId:string
    @ApiProperty()
    userName:string
    @ApiProperty()
    name:string
    @ApiProperty()
    mobileNumber:string
    @ApiProperty()
    email:string
    @ApiProperty()
    rating:string
    @ApiProperty()
    qualification:string
    @ApiProperty()
    experience:string
    //serviceProvider  
   
    @ApiProperty()
    minwageRating:string
    @ApiProperty()
    location:string
    @ApiProperty()
    skills:string
    @ApiProperty()
    aadharNumber:string
    @ApiProperty()
    labourcard:string
    @ApiProperty()
    themeId: string
    //users 
    @ApiProperty()
    firstName: string
    @ApiProperty()
    lastName: string
    
    @ApiProperty()
    password: string
    @ApiProperty()
    contactNumber: string
    @ApiProperty()
    address: string
    
     //vendorSchema
     @ApiProperty()
  vendorName:string;
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
  @IsOptional()
  blogPost:string;
  @ApiProperty()
  @IsOptional()
  shopPhoto:string;
  @ApiProperty()
  @IsOptional()
  color:[];
  @ApiProperty()
  @IsEnum(role)
  role: string
  
}
  
 
   