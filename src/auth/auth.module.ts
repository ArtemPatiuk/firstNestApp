import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel } from './auth.model';
import { User, UserSchema } from 'src/users/models/user.model';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
  ]),]
})
export class AuthModule { }
