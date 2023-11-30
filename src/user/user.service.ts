import { Injectable, NotFoundException, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from 'src/auth/dto/authDto';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
  // findByPassword(password: string) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // 유저 회원가입
  async create(authDTO: AuthDTO.SignUp): Promise<UserEntity> {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  // 전체조회
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      withDeleted: true, //false
    });
  }

  // 특정조회
  async findBy(options: any): Promise<UserEntity | undefined> {
    const userEntity = await this.userRepository.findOne(options);
    return userEntity || undefined;
  }

  // 삭제
  async softDeleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      if (!user.deleted_at) {
        user.deleted_at = new Date();
        await this.userRepository.save(user);
      }
    }
  }
}
