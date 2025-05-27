import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { databaseModule } from 'src/database/database.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [databaseModule, StockModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
  