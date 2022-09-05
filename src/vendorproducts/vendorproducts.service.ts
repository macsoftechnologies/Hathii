import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { vendorproductDto } from './dto/vendorproduct.dto';
import { vendorproduct } from './schema/vendorproduct.schema';

@Injectable()
export class VendorproductsService {
    constructor(@InjectModel(vendorproduct.name) private vendorproductModel:Model<vendorproduct>){}

    async vendorprodcreate(req:vendorproductDto){
        try{
            const vendorProres=await this.vendorproductModel.create(req)
            if(vendorProres){
                return{
                      statusCode:HttpStatus.OK,
                      VendproRes:vendorProres,
                      
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }


    async getVenProd(){
        try{
            const vendRes=await this.vendorproductModel.find()
            if(vendRes){
                 return{
                    statusCode:HttpStatus.OK,
                    Message:'list of vendorPorducts',
                    data:vendRes
                 }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }

    async deleteProd(req:vendorproductDto){
        try{
            const delprod=await this.vendorproductModel.deleteOne({vendorProdId:req.vendorProdId})
            if(delprod){
                return {
                    statusCode:HttpStatus.OK,
                    Message:'deleted Sucessfully',
                    delres:delprod

                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error
            }
        }
    }

    
    async editvendProd(req:vendorproductDto){
        try{
            const updateVend=await this.vendorproductModel.updateOne(
                {vendorProdId:req.vendorProdId},
                {$set:
                    {
                    vendorName:req.vendorName,
                    productName:req.productName,
                    price:req.price,
                    discount:req.discount,
                    finalPrice:req.finalPrice,
                    category:req.category,
                    specifications:req.specifications}})
            if(updateVend){
                return{
                    
                    statusCode:HttpStatus.OK,
                    Message:'updated Sucessfully',
                    vendupdateRes:updateVend
                }
            }
        }catch(error){
            return{
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                Message:error 
            }
        }
    }
}

