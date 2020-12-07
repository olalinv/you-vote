import { Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    await this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: CreateUserDto) {
    return await this.usersService.update(id, user);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    const _user = await this.usersService.findOne(loginUserDto);

    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);

    const token = await this.usersService.generateJWT(_user);
    _user.token = token;
    return _user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

}