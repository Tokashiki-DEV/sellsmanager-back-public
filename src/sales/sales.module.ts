import { Module } from '@nestjs/common';
import { salesService } from './sales.service';
import { salesController } from './sales.controller';
import { databaseModule } from 'src/database/database.module';

@Module({
  imports: [databaseModule],
  controllers: [salesController],
  providers: [salesService],
})
export class salesModule {}
