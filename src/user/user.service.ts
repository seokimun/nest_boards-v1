import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from 'src/auth/dto/authDto';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
  findByPassword(password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id: id });
  }
}
