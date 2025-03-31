import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument, ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>) { }

	async create(dto: CreateReviewDto): Promise<Review> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<Review | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<Review[]> {
		return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}
}