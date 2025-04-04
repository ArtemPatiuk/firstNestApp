import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true, min: 1, max: 5 })
	rating: number;

	@Prop({ type: Types.ObjectId, ref: 'Product', required: true })
	productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);