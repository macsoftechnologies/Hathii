import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { admin, adminSchema } from './Schema/admin.schema';
import { adminproduct, adminproductSchema } from './Schema/adminproduct.schema';
import { contact, contactSchema } from './Schema/contact.schema';
import { feedback, feedbackSchema } from './Schema/feedback.schema';
import { complaint, complaintSchema } from './Schema/complaints.schema';
import { rewardpoint, rewardpointSchema } from './Schema/rewardpoint.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:admin.name ,schema:adminSchema},
  {name:adminproduct.name,schema:adminproductSchema},
  {name:contact.name,schema:contactSchema},
  {name:feedback.name,schema:feedbackSchema},
  {name:complaint.name,schema:complaintSchema},
  {name:rewardpoint.name,schema:rewardpointSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
