import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { databaseModule } from 'src/database/database.module';

@Module({
  imports: [databaseModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService]
})
export class StockModule {}
