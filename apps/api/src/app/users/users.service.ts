import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SECRET } from '../config';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, user: CreateUserDto): Promise<User> {
    console.log(id);
    console.log(user);
    const userToUpdate = await this.userModel.findById(id);
    if (!userToUpdate) {
      return null;
    }
    const updatedUser = Object.assign(userToUpdate, user);
    return updatedUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findOne({email, password}: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({email});
    if (!user) {
      return null;
    }

    if (user.password === password) {
      return user;
    }

    return null;
  }

  public generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };
}
