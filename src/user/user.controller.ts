import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthDTO } from 'src/auth/dto/authDto';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, nickname } = authDTO;

    const userByEmail = await this.userService.findBy({ email });
    if (userByEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const userByNickname = await this.userService.findBy({ nickname });
    if (userByNickname) {
      throw new ConflictException('이미 사용중인 닉네임 입니다.');
    }

    const userEntity = await this.userService.create(authDTO);

    return '회원가입 성공!';
  }

  // 모든유저 조회
  @Get()
  async findAll(): Promise<UserEntity[]> {
    const userList = await this.userService.findAll();
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: '모든 데이터가 성공적으로 조회되었습니다',
    });
  }

  // 특정유저 조회(id값)
  @Get(':id')
  async findByOne(@Param('id') id: number): Promise<{
    data: UserEntity | null;
    statusCode: number;
    statusMsg: string;
  }> {
    const user = await this.userService.findBy({ where: { id: id } });
    return {
      data: user,
      statusCode: 200,
      statusMsg: `${id} 유저조회 완료`,
    };
  }

  // 특정유저 조회(nickname)
  @Get('nickname/:nickname')
  async findBy(@Param('nickname') nickname: string): Promise<{
    data: UserEntity | null;
    statusCode: number;
    statusMsg: string;
  }> {
    try {
      const user = await this.userService.findBy({
        where: { nickname: nickname },
      });
      return {
        data: user,
        statusCode: 200,
        statusMsg: `${nickname} 유저조회 완료`,
      };
    } catch (error) {
      throw new InternalServerErrorException('서버 오류', error.message);
    }
  }

  // 유저삭제(softDelete)
  @Delete(':id')
  async softDeleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.softDeleteUser(id);
    return { message: '해당 유저가 Soft Delete되었습니다' };
  }
}
