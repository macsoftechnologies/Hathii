import { Body, Controller, Get, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import {  AnyFilesInterceptor, FileFieldsInterceptor} from '@nestjs/platform-express'
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { userDto } from 'src/user/dto/user.dto';
import { AdminService } from './admin.service';
import { adminDto } from './Dto/admin.dto';
import { adminproductDto } from './Dto/adminproduct.dto';
import { appliedThemesDto } from './Dto/appliedThemes.dto';
import { complaintDto } from './Dto/complaints.dto';
import { contactDto } from './Dto/contact.dto';
import { couponDto } from './Dto/coupon.dto';
import { feedbackDto } from './Dto/feedback.dto';
import { notificationsDto } from './Dto/notifications.dto';
import { rewardpointDto } from './Dto/rewardpoint.dto';
import { themeDto } from './Dto/theme.dto';

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
    type:adminproductDto
  })
  @Post('/updateadminProduct')
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
  async updateadminproduct(@Body() req:adminproductDto, @UploadedFiles() image){
    try{
      const prodId=await this.adminService.updateAdminProduct(req, image)
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
    type:adminproductDto
  })
  @Post('/deleteadminProduct')
  async deleteadminproduct(@Body() req:adminproductDto){
    try{
      const prodId=await this.adminService.deleteAdminProduct(req)
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

   @ApiTags('admin')
   @ApiBody({
    type: couponDto
   })
   @Post('/addcoupon')
   async addCoupons(@Body() req: couponDto) {
    try{
      const addcoupon = await this.adminService.addCoupon(req);
      return addcoupon
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @Get('/getcouponslist')
   async getCoupons() {
    try{
      const addcoupon = await this.adminService.getCouponsList();
      return addcoupon
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: couponDto
   })
   @Post('/getcouponbyid')
   async getCouponById(@Body() req: couponDto) {
    try{
      const getcoupon = await this.adminService.getCouponById(req);
      return getcoupon
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: couponDto
   })
   @Post('/updatecoupon')
   async updateCoupon(@Body() req: couponDto) {
    try{
      const editcoupon = await this.adminService.editCoupon(req);
      return editcoupon
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: couponDto
   })
   @Post('/deletecoupon')
   async deleteCoupon(@Body() req: couponDto) {
    try{
      const deletecoupon = await this.adminService.removeCoupon(req);
      return deletecoupon
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: notificationsDto
   })
   @Post('/addNotification')
   async addNotification(@Body() req: notificationsDto) {
    try{
      const addnot = await this.adminService.addNot(req);
      return addnot
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: notificationsDto
   })
   @Get('/getNotificationList')
   async getNotificationList() {
    try{
      const getnots = await this.adminService.getNot();
      return getnots
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: notificationsDto
   })
   @Post('/getNotificationbyid')
   async getNotificationById(@Body() req: notificationsDto) {
    try{
      const getnot = await this.adminService.getNotById(req);
      return getnot
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: notificationsDto
   })
   @Post('/updateNotification')
   async updateNotification(@Body() req: notificationsDto) {
    try{
      const updatenot = await this.adminService.updateNot(req);
      return updatenot
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: notificationsDto
   })
   @Post('/deleteNotification')
   async deleteNotification(@Body() req: notificationsDto) {
    try{
      const deletenot = await this.adminService.deleteNot(req);
      return deletenot
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @ApiBody({
    type: themeDto
   })
   @Post('/addtheme')
   @UseInterceptors(FileFieldsInterceptor([{name: 'themeImage'}, {name: 'themeColor'}]))
   async addTheme(@Body() req: themeDto, @UploadedFiles() image) {
    try{
      const add = await this.adminService.addThemes(req, image);
      return add
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

   @ApiTags('admin')
   @Get('/themesList')
   async themesList() {
    try{
      const getThem = await this.adminService.getThemes();
      return getThem
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
   }

  @ApiTags('admin')
  @ApiBody({
    type: themeDto
   })
  @Post('/getByThemeId')
  async getTheme(@Body() req: themeDto) {
    try{
      const getById = await this.adminService.getThemeById(req);
      return getById
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type: themeDto
   })
  @Post('/updateTheme')
  @UseInterceptors(FileFieldsInterceptor([{name: 'themeImage'}, {name: 'themeColor'}]))
  async updateTheme(@Body() req: themeDto, @UploadedFiles() image) {
    try{
      const moderate = await this.adminService.updatetheme(req, image);
      return moderate
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type: themeDto
  })
  @Post('/deleteTheme')
  async removeTheme(@Body() req:themeDto) {
    try{
      const eliminate = await this.adminService.deleteTheme(req);
      return eliminate
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type: appliedThemesDto
  })
  @Post('/addAppliedTheme')
  async addAppliedTheme(@Body() req: appliedThemesDto) {
    try{
      const addtheme = await this.adminService.addappliedTheme(req);
      return addtheme
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('admin')
  @Get('/getAppliedTheme')
  async getAppliedTheme() {
    try{
      const getthemes = await this.adminService.getappliedTheme();
      return getthemes
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type: appliedThemesDto
  })
  @Post('/getAppliedThemeById')
  async getAppliedThemeById(@Body() req: appliedThemesDto) {
    try{
      const gettheme = await this.adminService.getappliedThemeById(req);
      return gettheme
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type: appliedThemesDto
  })
  @Post('/updateAppliedThemeById')
  async updateAppliedThemeById(@Body() req: appliedThemesDto) {
    try{
      const updatetheme = await this.adminService.updateappliedThemeById(req);
      return updatetheme
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }

  @ApiTags('admin')
  @ApiBody({
    type: appliedThemesDto
  })
  @Post('/deleteAppliedThemeById')
  async deleteAppliedThemeById(@Body() req: appliedThemesDto) {
    try{
      const deletetheme = await this.adminService.deleteappliedThemeById(req);
      return deletetheme
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error
      }
    }
  }
}
