import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(authDTO: AuthDTO.SignUp): Promise<UserEntity> {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      withDeleted: true, //false
    });
  }

  async findBy(criteria: { id?: number; email?: string; nickname?: string }) {
    return await this.userRepository.findOne({
      where: criteria,
    });
  }

  async softDeleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    user.deleted_at = new Date();
    await this.userRepository.save(user);
  }
}
