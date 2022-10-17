import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { categoryDto } from './dto/categoty.dto';
import { subcategoryDto } from './dto/subcategory.dto';
import { Category } from './schema/category.schema';
import { Subcategory } from './schema/subcategory.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name)
    private readonly subcategorymodel: Model<Subcategory>,
  ) {}

  async categoryAdd(req: categoryDto) {
    try {
      const addcat = await this.categoryModel.create(req);
      if (addcat) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Added Successfully',
          data: addcat,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getCatList() {
    try {
      const getcatlist = await this.categoryModel.find();
      if (getcatlist) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Category list',
          data: getcatlist,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getCat(req: categoryDto) {
    try {
      const getCategory = await this.categoryModel.findOne({
        categoryId: req.categoryId,
      });
      if (getCategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Here is the Category',
          data: getCategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async editCat(req: categoryDto) {
    try {
      const updateCategory = await this.categoryModel.updateOne(
        { categoryId: req.categoryId },
        {
          $set: {
            categoryName: req.categoryName,
          },
        },
      );
      if (updateCategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: updateCategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async deleteCat(req: categoryDto) {
    try {
      const deleteCategory = await this.categoryModel.deleteOne({
        categoryId: req.categoryId,
      });
      if (deleteCategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          data: deleteCategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async addSubcat(req: subcategoryDto) {
    try {
      const addSubcategory = await this.subcategorymodel.create(req);
      if (addSubcategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Added Successfully',
          data: addSubcategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }
  //
  async getSubcatlist() {
    try {
      const getSubcategorylist = await this.subcategorymodel.find();
      if (getSubcategorylist) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'list of subcategories',
          data: getSubcategorylist,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async getSubcatById(req: subcategoryDto) {
    try {
      const getSubcategory = await this.subcategorymodel.findOne({
        subcategoryId: req.subcategoryId,
      });
      if (getSubcategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Here is the subcategory',
          data: getSubcategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async updateSubcat(req: subcategoryDto) {
    try {
      const updateSubcategory = await this.subcategorymodel.updateOne(
        { subcategoryId: req.subcategoryId },
        {
          $set: {
            subcategoryName: req.subcategoryName,
            categoryId: req.categoryId,
          },
        },
      );
      if (updateSubcategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Updated Successfully',
          data: updateSubcategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }

  async deleteSubcat(req: subcategoryDto) {
    try {
      const deleteSubcategory = await this.subcategorymodel.deleteOne({subcategoryId: req.subcategoryId});
      if (deleteSubcategory) {
        return {
          statusCode: HttpStatus.OK,
          msg: 'Deleted Successfully',
          data: deleteSubcategory,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        msg: 'Invalid Request',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      };
    }
  }
}
