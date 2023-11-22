import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthDTO } from './dto/authDto';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  // 로그인
  @Post('/login')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const userByEmail = await this.userService.findBy({
      where: { email: email },
    });
    if (!userByEmail) {
      throw new UnauthorizedException('이메일 또는 비밀번호 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, userByEmail.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    return '로그인 완료';
  }
}
