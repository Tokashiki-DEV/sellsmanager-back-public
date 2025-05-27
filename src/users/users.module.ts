import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { databaseModule } from 'src/database/database.module';

@Module({
  imports: [databaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
