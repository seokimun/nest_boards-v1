import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { BoardEntity } from './boards.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시판 생성
  @Post('/create')
  async createBoard(
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const board = await this.boardService.createBoard(title, content);
    return board;
  }

  // 게시판 전체조회
  @Get()
  async findAll(): Promise<BoardEntity[]> {
    const boardList = await this.boardService.findAll();
    return Object.assign({
      data: boardList,
      statusCode: 200,
      statusMSg: '모든 데이터가 성공적으로 조회되었습니다',
    });
  }

  // 특정 게시판 조회(id)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<{
    data: BoardEntity | null;
    statusCode: number;
    statusMsg: string;
  }> {
    const board = await this.boardService.findBy({ where: { id } });
    return {
      data: board,
      statusCode: 200,
      statusMsg: `${id} 게시판조회 완료`,
    };
  }

  // 특정 게시판 수정
  @Patch(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() board: BoardEntity,
  ): Promise<string> {
    await this.boardService.updateBoard(id, board);
    return Object.assign({
      data: { board },
      statusCode: 200,
      statusMsg: '게시판 수정 성공',
    });
  }

  // 게시판 삭제
  @Delete(':id')
  async softDeleteBoard(@Param('id') id: number): Promise<{ message: string }> {
    await this.boardService.softDeleteBoard(id);
    return { message: '해당 게시글이 Soft Delete 되었습니다' };
  }
}
