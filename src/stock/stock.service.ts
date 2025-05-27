import { Injectable } from '@nestjs/common';
import { NewStockDto } from './dto/stock.dto';
import { databaseStockService } from 'src/database/database.stock.service';


@Injectable()
export class StockService {
  constructor(private readonly databaseStockService: databaseStockService) {}
  async createStockMovement(newStockMovement: NewStockDto) {
    await this.databaseStockService.newStockMovement(newStockMovement);
  }
  

  async displayStockMovements() : Promise<NewStockDto[]> {
    return await this.databaseStockService.displayStockMovements();
  }
  
  
}
