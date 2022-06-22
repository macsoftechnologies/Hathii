import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { productsDto } from './Dto/products.dto';
import { products } from './Schema/products.schema';
 
@Injectable()
export class ProductsService {
    constructor(@InjectModel(products.name) private productModel: Model<products>){}


    async  createDocs(req: productsDto, image){
        //console.log(req,"docs....", image)
        try{
          
            if (image) {
                const reqDoc = image.map((doc, index) => {
                    let IsPrimary = true
                    if (index == 0) {
                        IsPrimary =false

                        }
                    const randomNumber = Math.floor((Math.random() * 1000000) + 1);
                    return  doc.filename
                     
                })   
 
                req.Image = reqDoc.toString()
            }
             
            const docs = await this.productModel.create(req)
          
            if(docs){
                return{
                    statusCode: HttpStatus.OK,
                    message: "Required Documents",
                   data: {
                       docsReq:docs
                    }
                 }
             }
                return{
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "Invalid Request"
                }
            }catch(error){
                return{
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message
                };
             }
        }



 async getProd(){
    try{
    const result=await this.productModel.find()
     
    if(result){
        return{
            StatusCode:HttpStatus.OK,
            Message:'List of Products',
            Data:{
                item:result
            }
        }
    }

    }catch(error){
        return{
            StatusCode:HttpStatus.INTERNAL_SERVER_ERROR,
            Message:error
        }
    }
 }
 

}
