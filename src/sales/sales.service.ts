import { Injectable } from '@nestjs/common';
import {
  changeOrderItemDto,
  createsaleDto,
  deleteOrderDTO,
  displayOrders,
} from './dto/sales.dto';
import { databaseSalesService } from 'src/database/database.sales.service';

@Injectable()
export class salesService {
  constructor(private readonly databaseSalesService: databaseSalesService) {}
  async registerSale(saleData: createsaleDto) {
    await this.databaseSalesService.createSale(saleData);
  }

  async displaySales(start_date: any, end_date: any, page: number, pageSize: number, search_name: string) {
    return this.databaseSalesService.displaySales(start_date, end_date, page, pageSize, search_name);
  }

  async deleteOrder(order: deleteOrderDTO) {
    await this.databaseSalesService.deleteOrder(order);
  }
  async deleteOrderItem(order_item: deleteOrderDTO) {
    await this.databaseSalesService.deleteOrderItem(order_item);
  }

  async changeOrderItem(changeOrderItemData: changeOrderItemDto) {
    await this.databaseSalesService.changeOrderItem(changeOrderItemData);
  }
}
