import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/categoty.dto';
import { subcategoryDto } from './dto/subcategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('category')
  @ApiBody({
    type: categoryDto
  })
  @Post('/addcategory')
  async addCategory(@Body() req: categoryDto) {
    try{
      const addCat = await this.categoryService.categoryAdd(req);
      if(addCat) {
        return addCat;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: categoryDto
  })
  @Get('/getcatlist')
  async getCatList() {
    try{
      const getCategoryList = await this.categoryService.getCatList();
      if(getCategoryList) {
        return getCategoryList;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: categoryDto
  })
  @Post('/getcatbyid')
  async getCatById(@Body() req: categoryDto) {
    try{
      const getCategory = await this.categoryService.getCat(req);
      if(getCategory) {
        return getCategory;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: categoryDto
  })
  @Post('/updatecategory')
  async updateCategory(@Body() req: categoryDto) {
    try{
      const editCategory = await this.categoryService.editCat(req);
      if(editCategory) {
        return editCategory;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: categoryDto
  })
  @Post('/deletecategory')
  async deleteCategory(@Body() req: categoryDto) {
    try{
      const removeCategory = await this.categoryService.deleteCat(req);
      if(removeCategory) {
        return removeCategory;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: subcategoryDto
  })
  @Post('/addsubcategory')
  async addSubcategory(@Body() req: subcategoryDto) {
    try{
      const addSubcategory = await this.categoryService.addSubcat(req);
      if(addSubcategory) {
        return addSubcategory;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: subcategoryDto
  })
  @Get('/getsubcategorylist')
  async getSubcategoryList() {
    try{
      const getSubcategoryList = await this.categoryService.getSubcatlist();
      if(getSubcategoryList) {
        return getSubcategoryList;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: subcategoryDto
  })
  @Post('/getsubcategorybyid')
  async getSubcategoryById(@Body() req: subcategoryDto) {
    try{
      const getSubcategorybyid = await this.categoryService.getSubcatById(req);
      if(getSubcategorybyid) {
        return getSubcategorybyid;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: subcategoryDto
  })
  @Post('/updatesubcategory')
  async updateSubcategory(@Body() req: subcategoryDto) {
    try{
      const updateSubcategory = await this.categoryService.updateSubcat(req);
      if(updateSubcategory) {
        return updateSubcategory;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: subcategoryDto
  })
  @Post('/deletesubcategory')
  async deleteSubcategory(@Body() req: subcategoryDto) {
    try{
      const deleteSubcategory = await this.categoryService.deleteSubcat(req);
      if(deleteSubcategory) {
        return deleteSubcategory;
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('category')
  @ApiBody({
    type: categoryDto
  })
  @Post('/vendorproductsbycatname')
  async vendorproductsbycat(@Body() req: categoryDto) {
    try{
      const search = await this.categoryService.getproductsbycategory(req);
      return search
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }
}
