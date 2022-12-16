import { Body, Controller, Get, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import {  AnyFilesInterceptor} from '@nestjs/platform-express'
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminService } from './admin.service';
import { adminDto } from './Dto/admin.dto';
import { adminproductDto } from './Dto/adminproduct.dto';
import { complaintDto } from './Dto/complaints.dto';
import { contactDto } from './Dto/contact.dto';
import { feedbackDto } from './Dto/feedback.dto';
import { rewardpointDto } from './Dto/rewardpoint.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

 
  @ApiTags('admin')
  @ApiBody({
    type:adminDto
  })
  @Post('/register')
  async createAdmin(@Body() req: adminDto){
    try{
      const result = await this.adminService.Create(req)
      return result
    } catch(error){
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
   
  
@ApiTags('admin')
@ApiBody({
    type:adminDto
  })
@Post('/login')
async login(@Body() req: adminDto){
    try{
      const result = await this.adminService.loginAdmin(req)
      return result
    } catch(error){
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
  }
 
  // @ApiTags('admin')
  // @ApiBody({
  //   type: adminDto
  // })
  // @Post('/updateAdmin')
  // async updateAdmin(@Body() req: adminDto) {
  //   try{
  //     const moderate = await this.adminService.adminUpdate(req);
  //     return moderate;
  //   } catch(error) {
  //     return {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       msg: error,
  //     }
  //   }
  // }


  @ApiTags('admin')
  @ApiBody({
    type:adminproductDto
  })
  @Post('/createadminproduct')
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
  async CreateProdAmin(@Body() req: adminproductDto, @UploadedFiles() image) {
      try {
          const result = await this.adminService.addadminProd(req, image)
          console.log("result", result);

          return result
      } catch (error) {
          return {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: error.message,
          };
      }
  }


  @ApiTags('admin')
  @Get('/getadminproduct')
  async getProd(){
    try{
      const res=await this.adminService.getadminProd()
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type:adminproductDto
  })
  @Post('/getadminProductById')
  async getadminproduct(@Body() req:adminproductDto){
    try{
      const prodId=await this.adminService.getProductId(req)
      return prodId
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type:contactDto
  })
  @Post('/createContact')
  async createCon(@Body() req:contactDto){
    try{
      const rescon=await this.adminService.Createcontact(req)
      return rescon
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }
 
  @ApiTags('admin')
  @ApiBody({
    type:contactDto
  })
  @Post('/updatecontact')
  async updateCon(@Body() req:contactDto){
    try{
      const result =await this.adminService.updateContact(req)
      return result
    }catch(error){
      return{
        statuscode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }


  @ApiTags('admin')
  @ApiBody({
    type:contactDto
  })
  @Post('/removecontact')
  async removecontact(@Body() req:contactDto){
    try{
      const removeCon=await this.adminService.deleteContact(req)
      return removeCon
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }



  @ApiTags('admin')
  @Get('/getContact')
  async contactget(){
    try{
      const resp=await this.adminService.getcontact()
      return resp
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:error
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type:feedbackDto
  })
  @Post('/creatFeedback')
  async Create(@Body() req:feedbackDto){
    try{
      const resfeed=await this.adminService.createfeddback(req)
      return resfeed

    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }
 
  @ApiTags('admin')
  @ApiBody({
    type:feedbackDto
  })
  @Post('/updatefeedback')
  async editFeedback(@Body() req:feedbackDto){
    try{
      const res =await this.adminService.updatefeedback(req)
      return res;
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }
 

  @ApiTags('admin')
  @ApiBody({
    type:feedbackDto
  })
  @Get('/getfeedback')
  async feedbackget(){
    try{
      const res=await this.adminService.getfeedback()
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type:feedbackDto
  })
  @Post('/getfeedbackId')
  async getById( @Body() req:feedbackDto){
    try{
      const res=await this.adminService.feedbackbyId(req)
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }

    

     @ApiTags('admin')
     @ApiBody({
      type:feedbackDto
     })
    @Post('/removefeedback')
    async delFeedback(@Body() req:feedbackDto){
      try{
        const feedRemove=await this.adminService.deletefeedback(req)
        return feedRemove
      }catch(error){
        return{
          statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
          Message:error
        }
      }
    }
  

    @ApiTags('admin')
    @ApiBody({
      type:complaintDto
    })
  @Post('/createComplaint')
  async complaintCreate(@Body() req:complaintDto){
    try{
      const res=await this.adminService.createcomplaint(req)
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type:complaintDto
  })
  @Post('/removecomplaint')
  async removeComplaint(@Body() req:complaintDto){
    try{
      const result=await this.adminService.deletecomplaint(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }
  
  @ApiTags('admin')
  @ApiBody({
    type:complaintDto
  })
  @Post('editComplaints')
  async editCompailts(@Body() req:complaintDto){
    try{
      const resedit=await this.adminService.editComplaint(req)
      return resedit
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }


  @ApiTags('admin')
  @Get('/getComplaints')
  async  getComplaints(){
    try{
      const result=await this.adminService.getcomplainte()
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
  }
   
  @ApiTags('admin')
  @ApiBody({
    type:complaintDto
  })
  @Post('/getComplaintById')
  async getComplaintId(@Body() req:complaintDto){
    try{
      const res=await this.adminService.getComplaintByid(req)
      return res
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
  }
   

  @ApiTags('admin')
  @ApiBody({
    type:rewardpointDto
  })
   @Post('/addRewardpoint')
   async CreatePoint(@Body() req:rewardpointDto){
    try{
      const respoint=await this.adminService.createrewardpoint(req)
      return respoint
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
   }

   @ApiTags('admin')
   @Get('/getRewardPoint')
   async points(){
    try{
      const result=await this.adminService.getRewardPoints()
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
     type:rewardpointDto
   })
   @Post('/getrewardpointById')
   async getpointsById(@Body() req:rewardpointDto){
    try{
      const pointById=await this.adminService.getpointById(req);
      return pointById;
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
   }
   @ApiTags('admin')
   @ApiBody({
     type:rewardpointDto
   })
   @Post('/removePoints')
   async removePoint(@Body() req:rewardpointDto){
    try{
      const  pointRemoveRes=await this.adminService.deletePoints(req)
      return pointRemoveRes
    }catch(error){
      return {
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error 
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
     type:rewardpointDto
   })
   @Post('/editRewardPoints')
   async rewardPointedit(@Body() req:rewardpointDto){
    try{
      const result=await this.adminService.editPoints(req)
      return result
    }catch(error){
      return{
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        Message:error
      }
    }
   }
}
