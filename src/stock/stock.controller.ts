import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { NewStockDto } from './dto/stock.dto';


@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async listarHistoricoDeEstoque() : Promise<NewStockDto[]>{
    return this.stockService.displayStockMovements();
  }
}
