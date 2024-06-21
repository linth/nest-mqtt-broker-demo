import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUserDto';
import crypto from 'crypto';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('all_users')
  async getAllUsers(): Promise<User[] | undefined> {
    return await this.userService.getAllUsers();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return await this.userService.create(createUserDto);
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<User[] | undefined> {
    return await this.userService.findOneByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | undefined> {
    return await this.userService.findOne(id);
  }
}
