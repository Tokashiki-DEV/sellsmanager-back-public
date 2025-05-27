import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { salesService } from './sales.service';
import {
  changeOrderItemDto,
  createsaleDto,
  deleteOrderDTO,
  displayOrders,
} from './dto/sales.dto';
import { Timestamp } from 'typeorm';

@Controller('sales')
export class salesController {
  constructor(private readonly salesService: salesService) {}

  @Get()
  async listarVendas(
    @Query('start_date') start_date: any,
    @Query('end_date') end_date: any,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('search_name') search_name: string

  ) {
    return this.salesService.displaySales(start_date, end_date, page, pageSize, search_name);
  }

  @Post()
  async cadastrarVenda(@Body() salleData: createsaleDto): Promise<string> {
    await this.salesService.registerSale(salleData);
    return 'Venda cadastrada com sucesso!';
  }
  @Patch('deleteorder')
  async deletarOrder(@Body() order: deleteOrderDTO) {
    await this.salesService.deleteOrder(order);
    return 'Pedido deletado com sucesso';
  }
  @Patch('deleteorderitem')
  async deletarOrderItem(@Body() order_item: deleteOrderDTO) {
    await this.salesService.deleteOrderItem(order_item);
    return 'Item do pedido deletado com sucesso';
  }

  @Patch('item')
  async atualizarOrderItem(@Body() changeOrderItemData: changeOrderItemDto) {
    await this.salesService.changeOrderItem(changeOrderItemData);
    return 'Item de venda atualizada com sucesso!';
  }
}
