import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { Review, ReviewModel } from './review.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';


@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewModel }
    ])
  ],
  providers: [ReviewService]
})
export class ReviewModule { }