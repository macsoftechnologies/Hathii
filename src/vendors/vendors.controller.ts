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
import { vendorDto } from './Dto/venders.dto';
import { VendorsService } from './vendors.service';

@Controller('vendor')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post('/addVendor')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'blogPost' }, { name: 'shopPhoto' }]),
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

  @Post('removeVendor')
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

  @Post('updateVendor')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'blogPost' }, { name: 'shopPhoto' }]),
  )
  async updateVendor(@Body() req: vendorDto, @UploadedFiles() image) {
    try {
      const result = await this.vendorsService.update(req, image);
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
