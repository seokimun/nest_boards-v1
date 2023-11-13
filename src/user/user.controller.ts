import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthDTO } from 'src/auth/dto/authDto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, nickname } = authDTO;

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const hasNickname = await this.userService.findByNickname(nickname);
    if (hasNickname) {
      throw new ConflictException('이미 사용중인 닉네임 입니다.');
    }

    const userEntity = await this.userService.create(authDTO);

    return '회원가입 성공!';
  }

  // 모든유저 조회
  @Get('list')
  async findAll(): Promise<UserEntity[]> {
    const userList = await this.userService.findAll();
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: '모든 데이터가 성공적으로 조회되었습니다',
    });
  }

  // 특정유저 조회
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity[]> {
    const userList = await this.userService.findById(+id);
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: '유저가 성공적으로 조회되었습니다',
    });
  }

  // 삭제
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<UserEntity[]> {
    await this.userService.deleteUser(+id);
    return Object.assign({
      data: { userId: id },
      statusCode: 200,
      statusMsg: '삭제완료',
    });
  }
}
