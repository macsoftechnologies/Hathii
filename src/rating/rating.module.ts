import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { rating, ratingSchema } from './Schema/rating.schema';
import { review, reviewSchema } from './Schema/review.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:rating.name,schema: ratingSchema}]),
           MongooseModule.forFeature([{name: review.name, schema: reviewSchema}])],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
