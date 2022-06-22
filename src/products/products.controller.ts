import { Body, Controller, Get, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { productsDto } from './Dto/products.dto';
import { ProductsService } from './products.service';
import { AnyFilesInterceptor} from '@nestjs/platform-express'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Post('/image')
  @UseInterceptors(
    AnyFilesInterceptor({
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        }),
    }),
)
 
  async docsCreate(@Body() req:productsDto, @UploadedFiles() image){
    try{
      const result = await this.productsService.createDocs(req, image)
      return result
    }catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
 

    @Get('getProducts')
    async getfile(){
      try{
        const result=await this.productsService.getProd()
        return result

      }catch(error){
        return{
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          message:error.message
        }
      }
    }
     
}
