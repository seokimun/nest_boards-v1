import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        this.userRepository = userRepository
    }

    // User 리스트 조회
    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    // 특정유저 조회
    findOne(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    // 유저저장
    async saveUser(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    // 유저수정
    async updateUser(id: number, user: User): Promise<void> {
        await this. userRepository.update(
        id,
        user
        );
    }

    // 유저삭제
    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
