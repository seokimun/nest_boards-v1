import { ASYNC_METHOD_SUFFIX } from '@nestjs/common/module-utils/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column({ default: true })
  isActive: boolean;
}
