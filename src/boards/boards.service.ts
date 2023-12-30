import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './boards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  // 게시판 생성
  async createBoard(title: string, content: string) {
    const board = await this.boardRepository.save({
      title: title,
      content: content,
    });
    return board;
  }

  // 전체조회
  async findAll(): Promise<BoardEntity[]> {
    return this.boardRepository.find({
      withDeleted: true,
    });
  }

  // 특정조회
  async findBy(options: any): Promise<BoardEntity | undefined> {
    const boardEntity = await this.boardRepository.findOne(options);
    return boardEntity || undefined;
  }

  // 업데이트
  async updateBoard(id: number, board: BoardEntity): Promise<void> {
    await this.boardRepository.update(id, board);
  }

  // 삭제
  async softDeleteBoard(id: number): Promise<void> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (board) {
      if (!board.deleted_at) {
        board.deleted_at = new Date();
        await this.boardRepository.save(board);
      }
    }
  }
}
