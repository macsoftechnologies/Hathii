import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiTags   } from '@nestjs/swagger';
import { vendorDto } from './Dto/venders.dto';
import { VendorsService } from './vendors.service';

@Controller('vendor')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}
  @ApiTags('vendor')
  @ApiBody({
    type:vendorDto
  })
  @Post('/addVendor')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'blogPost' }, { name: 'shopPhoto' },{name:'color'}]),
  )
  async create(@Body() req: vendorDto, @UploadedFiles() image) {
    try {
      const result = await this.vendorsService.Create(req, image);
      console.log('result', result);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('vendor')
  @ApiBody({
    type: vendorDto
  })
  @Post('/vendorlogin')
  async vendorLogin(@Body() req: vendorDto) {
    try{
      const enter = await this.vendorsService.loginVendor(req);
      return enter;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('vendor')
  @Get('GetVendors')
  async listVendors() {
    try {
      const result = await this.vendorsService.getVendor();
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }


  @ApiTags('vendor')
  @ApiBody({
    type:vendorDto
  })
  @Post('/removeVendor')
  async vendDelete(@Body() req: vendorDto) {
    try {
      const result = await this.vendorsService.deleteVen(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }


  @ApiTags('vendor')
  @ApiBody({
    type:vendorDto
  })
  @Post('getVendorById')
  async getvendor(@Body() req: vendorDto) {
    try {
      const result = await this.vendorsService.getVendorById(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        Message: error,
      };
    }
  }


  @ApiTags('vendor')
  @ApiBody({
    type:vendorDto
  })
  @Post('/updateVendor')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'blogPost' }, { name: 'shopPhoto' },{name:'color'}]),
  )
  async updateVendor(@Body() req: vendorDto, @UploadedFiles() image) {
    try {
      const result = await this.vendorsService.updateVendor(req, image);
      console.log('result', result);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
