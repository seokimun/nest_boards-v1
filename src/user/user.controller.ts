import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user.entity';

@Controller('user')
export class UserController {
    constructor (private userService: UserService) {
        this.userService = userService;
    }

// // 모든 유저 조회
// @Get('list')
// async findAll(): Promise<User[]>{
//     const userList = await this.userService.findAll();
//     return Object.assign({
//         data: userList,
//         statusCode: 200,
//         statusMsg: '모든 데이터 조회가 성공적으로 완료되었습니다.',
//     });
// }

// // 특정 유저 조회
// @Get(':id')
// async findOne(@Param('id') id: number): Promise<User> {
//     const foundUser = await this.userService. findOne(+id);
//     return Object.assign({
//         data: foundUser,
//         statusCode: 200,
//         statusMsg: '데이터 조회가 성공적으로 완료되었습니다.',
//     });
// }


// // 유저 업데이트
// @Put(':id')
// async updateUser(@Param('id') id: number, @Body() user: User): Promise<string>{
//     await this.userService.updateUser(id, user);
//     return Object.assign({
//         data: {user},
//         statusCode: 200,
//         statusMsg: '업데이트 성공',
//     });
// }


// 유저 생성
@Post()
async saveUser(@Body() user: User): Promise<string> {
    await this.userService.saveUser(user);
    return Object.assign({
        data: {user},
        statusCode: 200,
        statusMsg: '저장 완료',
    });
}


// // 유저 삭제
// @Delete(':id')
// async deleteUser(@Param('id') id: string): Promise<string> {
//     await this.userService.deleteUser(+id);
//     return Object.assign({
//         data: {ID : id},
//         statusCode: 200,
//         statusMsg: '삭제 완료',
//     });
// }

}
