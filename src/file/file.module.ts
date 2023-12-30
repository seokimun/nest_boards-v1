import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { FileController } from './file.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', //업로드된 파일경로 저장
      storage: multer.diskStorage({
        //파일을 저장할 방법 선택
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          //파일이름을 어떻게 저장할지 선택
          cb(null, `${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 5, //5MB로 파일크기 제한
      },
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
