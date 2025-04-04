import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';


@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema }
    ])
  ],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule { }