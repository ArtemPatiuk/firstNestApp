import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {

	}
	@Get('user')
	async getByEmail(email: string) {
		return this.UserModel.findOne({ email });
	}

	async createUser({ email, password }: { email: string, password: string }) {
		const newUser = new this.UserModel({ email, password });
		return newUser.save();
	}
}
