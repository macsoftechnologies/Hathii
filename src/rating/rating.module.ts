import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { rating, ratingSchema } from './Schema/rating.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:rating.name,schema:ratingSchema}])],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
