import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

/**
 * 
 * 1. 使用 Promise<User | undefined>, 利用類型推斷
 * 2. 減少 await 使用, 在 update 方法中, 只在必要時使用 await.
 * 
 */

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({where: {id: id}});
  }

  async getAllUsers(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async findOneByName(name: string): Promise<User[] | undefined> {
    return this.userRepository.find({ where: {name: name}});
  }

  async findOneWithUserName(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: userName } });
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const newUser  = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    const { password, ...result } = newUser;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }


  // hookHandler(req: HttpRequest, res: HttpResponse) {
  //   const hmac = crypto.createHmac('sha1', SECRET);
  //   const digest = hmac.update(req.body).digest('hex');
  //   if (req.header['X ORingnet Signature'] === digest) {
  //     // The received payload is
  //   }
  // }
}
