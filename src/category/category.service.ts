import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { vendorproductDto } from 'src/vendorproducts/dto/vendorproduct.dto';
import { vendorproduct } from 'src/vendorproducts/schema/vendorproduct.schema';
import { categoryDto } from './dto/categoty.dto';
import { subcategoryDto } from './dto/subcategory.dto';
import { Category } from './schema/category.schema';
import { Subcategory } from './schema/subcategory.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private readonly subcategorymodel: Model<Subcategory>,
    @InjectModel(vendorproduct.name) private readonly vendorProductModel: Model<vendorproduct>
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

  async getproductsbycategory(req: categoryDto) {
    try{
      const categories = await this.categoryModel.find({categoryName: new RegExp('.*' + req.categoryName + '.*', 'i')});
      if(categories) {
        if(categories.length === 1) {
          const category = categories[0];
          const prods = await this.vendorProductModel.aggregate([
          {$match: {categoryId: category.categoryId}},
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryId',
              foreignField: 'categoryId',
              as: 'category'
            }
          },
          {
            $unwind: '$category'
          },
          {
            $project: {
              vendorProdId: 1,
              vendorId: 1,
              vendorName: 1,
              productName: 1,
              productImage: 1,
              price: 1,
              discount: 1,
              finalPrice: 1,
              longitude: 1,
              latitude: 1,
              shopType: 1,
              categoryId: category.categoryName,
              subCategoryId: 1,
              productDetails: 1,
              policy: 1,
              description: 1,
              hold: 1,
              request: 1,
              availability: 1,
              quantity: 1
            }
          }
        ]);
        return {
          statusCode: HttpStatus.OK,
          msg: 'vendorproducts of searched category',
          data: prods,
        }
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          msg: "No products matched the search",
        }
      }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          msg: "Invalid Request",
        }
      }
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }
}
