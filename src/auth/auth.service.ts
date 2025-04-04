import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './data-transfer-object/auth.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash, compare } from 'bcryptjs'
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constats';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private readonly userModel: ModelType<UserDocument>,
		private readonly jwtService: JwtService) {
	}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt)
		});
		return newUser.save();
	}
	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async validateUser(email: string, password: string): Promise<Pick<UserDocument, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			accessToken: await this.jwtService.signAsync(payload)
		};
	}

}
