import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user.entity';

@Controller('user')
export class UserController {
    constructor (private userService: UserService) {}
}
