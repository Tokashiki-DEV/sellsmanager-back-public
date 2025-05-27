import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import supabase from './database';
import {
  changeOrderItemDto,
  createsaleDto,
  deleteOrderDTO,
  orderDto,
  orderItemsDto,
} from 'src/sales/dto/sales.dto';
import { databaseProductsService } from './database.products.service';
import { databaseServicesService } from './database.services.service';
import { databaseStockService } from './database.stock.service';
import {
  displayEmployeeSalesDto,
  IDisplayEmployeeSales,
} from 'src/employee/dto/employee.dto';
import { count } from 'console';

interface ISalesOrderItem {
  product_id: number | null;
  service_id: number | null;
  service_price: number | null;
  product_price: number | null;
  quantity: number | null;
}

interface InterfaceSalesOrderItem {
  order_id: number;
  product_id: number | null;
  service_id: number | null;
  service_price: number;
  product_price: number;
  quantity: number | null;
}

@Injectable()
export class databaseSalesService {
  constructor(
    private readonly databaseProductsService: databaseProductsService,
    private readonly databaseServicesService: databaseServicesService,
    private readonly databaseStockService: databaseStockService,
  ) {}

  async createSale(saleData: createsaleDto) {
    const verifyProductNServicePrice = async (saleData: createsaleDto) => {
      const newOrderItems = await Promise.all(
        saleData.order_items.map(async (item) => {
          if (item.service_id === undefined && item.product_id !== undefined) {
            const productData =
              await this.databaseProductsService.displayProductById(
                item.product_id,
              );
            return {
              product_id: item.product_id,
              service_id: null,
              service_price: null,
              product_price: productData[0].price * item.quantity,
              quantity: item.quantity,
            };
          }

          if (item.product_id === undefined && item.service_id !== undefined) {
            const serviceData =
              await this.databaseServicesService.displayServicesById(
                item.service_id,
              );

            return {
              product_id: null,
              service_id: item.service_id,
              product_price: null,
              service_price: serviceData.price,
              quantity: null,
            };
          }
          throw new BadRequestException('missing arguments');
        }),
      );

      return newOrderItems;
    };

    const newOrderItems = await verifyProductNServicePrice(saleData);

    const orderTotalPrice = newOrderItems.reduce(
      (
        accumulator: {
          total_service_price: number;
          total_product_price: number;
        },
        item: ISalesOrderItem,
      ) => {
        if (item.product_id === null && item.service_id !== null) {
          // Serviço
          return {
            ...accumulator,
            total_service_price:
              accumulator.total_service_price + item.service_price!,
          };
        }

        if (item.service_id === null && item.product_id !== null) {
          // Produto (considerando quantidade)
          const total = item.product_price! * (item.quantity || 1);
          return {
            ...accumulator,
            total_product_price: accumulator.total_product_price + total,
          };
        }

        return accumulator;
      },
      { total_service_price: 0, total_product_price: 0 },
    );

    const newOrderPayload = {
      customer_id: saleData.order.customer_id,
      employe_id: saleData.order.employe_id,
      total_service_price: orderTotalPrice!.total_service_price,
      total_product_price: orderTotalPrice!.total_product_price,
    };

    const { data, error }: { data: orderDto[] | null; error: any } =
      await supabase.from('orders').insert(newOrderPayload).select();
    if (error)
      throw new InternalServerErrorException('error while inserting order');

    const newOrderId = data![0].id;
    newOrderItems.map(async (item) => {
      const { error }: { error: any } = await supabase
        .from('order_items')
        .insert({
          order_id: newOrderId,
          ...item,
        });

      if (item.product_id !== null) {
        this.databaseStockService.adjustStock(
          item.product_id!,
          Number(-item.quantity!),
          'Venda',
          'Saida',
        );
      }
      if (error)
        throw new InternalServerErrorException(
          'error while inserting order items',
        );
    });
  }
  async displayEmployeSales(
    dateFilters: displayEmployeeSalesDto,
  ): Promise<IDisplayEmployeeSales[]> {
    const newDateStart: Date = new Date(dateFilters.start_date);
    const newDateEnd: Date = new Date(dateFilters.end_date);

    const { data, error } = await supabase.rpc('get_orders_by_employee', {
      end_date: newDateEnd,
      start_date: newDateStart,
    });

    if (error) throw new InternalServerErrorException(error);
    return data!;
  }
  async displaySales(
    start_date?: string,
    end_date?: string,
    page: number = 1,
    pageSize: number = 100,
    search_name?: string,
  ) {
    // Convert dates and handle pagination
    const newDateStart = start_date ? new Date(start_date).toISOString() : null;
    const newDateEnd = end_date ? new Date(end_date).toISOString() : null;
    const offset = (page - 1) * pageSize;

    const { data, error } = await supabase.rpc('search_orders', {
      new_date_start: newDateStart,
      new_date_end: newDateEnd,
      search_term: search_name || null,
      page_limit: pageSize,
      page_offset: offset,
    });

    if (error) throw error;

    // 2. Get total price with same filters
    const { data: priceData } = await supabase
      .rpc('get_total_price', {
        start_date_arg: newDateStart,
        end_date_arg: newDateEnd,
      })
      .select('total_price');

    // Extract pagination data from first row
    const total = data?.[0]?.total_count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: data || [],
      count: total,
      page,
      pageSize,
      totalPages,
      totalPrice: priceData![0].total_price,
    };
  }

  async changeOrderItem(changeOrderItemData: changeOrderItemDto) {
    if (changeOrderItemData.product_id !== undefined) {
      const product_price =
        await this.databaseProductsService.displaySingleProductPriceById(
          changeOrderItemData.product_id,
        );
      const newPrice = product_price! * changeOrderItemData.quantity;

      const {
        data,
        error,
      }: { data: InterfaceSalesOrderItem[] | null; error: any } = await supabase
        .from('order_items')
        .select('*')
        .eq('id', changeOrderItemData.id);

      const oldQuantity = data![0].quantity;
      const oldProduct_id = data![0].product_id;
      const newQuantity = changeOrderItemData.quantity;
      const quantity_diff = oldQuantity! - newQuantity;

      if (oldProduct_id === changeOrderItemData.product_id) {
        await this.databaseStockService.adjustStock(
          changeOrderItemData.product_id,
          Number(quantity_diff),
          'Ajuste',
          quantity_diff > 0 ? 'Entrada' : 'Saida',
        );

        const { error: orderItemUpdateError } = await supabase
          .from('order_items')
          .update({
            quantity: newQuantity,
            product_price: newPrice,
          })
          .eq('id', changeOrderItemData.id);

        if (orderItemUpdateError) {
          throw new Error(
            `Error updating order item: ${orderItemUpdateError.message}`,
          );
        }
        return;
      }
      if (oldProduct_id !== changeOrderItemData.product_id) {
        // AJUSTE SE O PRODUTO FOR ALTERADO
        // AJUSTE DO PRODUTO ANTIGO (PRÉ-ALTERAÇÃO)
        await this.databaseStockService.adjustStock(
          oldProduct_id!,
          Number(oldQuantity!),
          'Ajuste',
          'Entrada',
        );
        // AJUSTE DO NOVO PRODUTO (PÓS ALTERAÇÃO)
        const { error: orderItemUpdateError } = await supabase
          .from('order_items')
          .update({
            product_id: changeOrderItemData.product_id,
            quantity: newQuantity,
            product_price: newPrice,
          })
          .eq('id', changeOrderItemData.id);

        await this.databaseStockService.adjustStock(
          changeOrderItemData.product_id!,
          Number(-changeOrderItemData.quantity),
          'Ajuste',
          'Saida',
        );
        if (orderItemUpdateError) {
          throw new Error(
            `Error updating order item: ${orderItemUpdateError.message}`,
          );
        }
      }
    }
    if (changeOrderItemData.service_id !== undefined) {
      const { id, price } =
        await this.databaseServicesService.displayServicesById(
          changeOrderItemData.service_id,
        );
      if (id !== undefined) {
        const { data, error } = await supabase
          .from('order_items')
          .update({
            service_price: price,
            service_id: changeOrderItemData.service_id,
          })
          .eq('id', changeOrderItemData.id);
        if (error) throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteOrder(order: deleteOrderDTO) {
    const { data, error }: { data: orderItemsDto[] | null; error: any } =
      await supabase.from('order_items').select('*').eq('order_id', order.id);
    if (error)
      throw new InternalServerErrorException('error while getting order_items');

    data!.map(async (item) => {
      if (item.id !== undefined) {
        if (item.product_id !== undefined) {
          const oldQuantity = item.quantity;
          await this.databaseStockService.adjustStock(
            item.product_id,
            Number(oldQuantity!),
            'Ajuste',
            'Entrada',
          );
        }
      }
    });
    const itemToBeDeleted = await supabase
      .from('order_items')
      .delete()
      .eq('order_id', order.id);
    if (itemToBeDeleted.error)
      throw new InternalServerErrorException(itemToBeDeleted.error);

    const orderToBeDeleted = await supabase
      .from('orders')
      .delete()
      .eq('id', order.id);
    if (orderToBeDeleted.error)
      throw new InternalServerErrorException('error while deleting order');
  }

  async deleteOrderItem(orderItem: deleteOrderDTO) {
    //ajustar o total price do order, voltar o estoque do produto se existir produto (opcional deletar a order se a mesma não tiver mais nenhum item)
    const selectByOrderItemId = await supabase //select order item
      .from('order_items')
      .select('*')
      .eq('id', orderItem.id);
    if (selectByOrderItemId.error)
      throw new BadRequestException('order item does not exist');

    const selectOrder = await supabase //select order
      .from('orders')
      .select('*')
      .eq('id', selectByOrderItemId.data[0].order_id);

    //checa se é um produto
    if (selectByOrderItemId.data[0].product_id !== null) {
      const newTotalProductPrice = //faz a conta do novo preço
        Number(selectOrder.data![0].total_product_price) -
        Number(selectByOrderItemId.data[0].product_price);
      const payload = {
        total_product_price: newTotalProductPrice,
      };
      const { error } = await supabase //atualiza o preço total do order
        .from('orders')
        .update(payload)
        .eq('id', selectByOrderItemId.data[0].order_id);
      if (error)
        throw new InternalServerErrorException(
          'couldnt update total product price',
        );
      const oldQuantity = selectByOrderItemId.data[0].quantity;
      //ajusta o stoque
      await this.databaseStockService.adjustStock(
        selectByOrderItemId.data[0].product_id,
        Number(oldQuantity!),
        'Ajuste',
        'Entrada',
      );
      const itemToBeDeleted = await supabase //deleta o order item
        .from('order_items')
        .delete()
        .eq('id', orderItem.id);
      if (itemToBeDeleted.error)
        throw new InternalServerErrorException('couldnt delete order item');
    }
    if (selectByOrderItemId.data[0].service_id !== null) {
      const newTotalServicePrice = //faz a conta do novo preço do total do serviço
        Number(selectOrder.data![0].total_service_price) -
        Number(selectByOrderItemId.data[0].service_price);
      const payload = {
        total_service_price: newTotalServicePrice,
      };
      const { error } = await supabase //atualiza o preço total do order
        .from('orders')
        .update(payload)
        .eq('id', selectByOrderItemId.data[0].order_id);
      if (error)
        throw new InternalServerErrorException(
          'couldnt update total product price',
        );
      const itemToBeDeleted = await supabase //deleta o order item
        .from('order_items')
        .delete()
        .eq('id', orderItem.id);
      if (itemToBeDeleted.error)
        throw new InternalServerErrorException('couldnt delete order item');
    }
  }
}
