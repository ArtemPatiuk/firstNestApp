import { SchemaFactory } from '@nestjs/mongoose';
import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;

	@prop()
	updatedAt: Date;
}

export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPage extends Base { }

@index({ '$**': 'text' })
export class TopPage extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	metaTitle: string;

	@prop()
	metaDescription: string;

	@prop()
	category: string;

	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [TopPageAdvantage] })
	advantages?: TopPageAdvantage[];

	@prop()
	seoText?: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
export const TopPageSchema = SchemaFactory.createForClass(TopPage);