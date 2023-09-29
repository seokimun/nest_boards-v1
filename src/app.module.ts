import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserModule } from './user/user.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfig } from './database/typerom.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    UserModule,
    User,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
