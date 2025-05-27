import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewStockDto } from 'src/stock/dto/stock.dto';
import supabase from './database';

@Injectable()
export class databaseStockService {
  async newStockMovement(newStockDto: NewStockDto) {
    const { error } = await supabase
      .from('stock_movements')
      .insert(newStockDto);
    if (error) throw new InternalServerErrorException(error);
  }

  async displayStockMovements(): Promise<NewStockDto[]> {
    const { data, error }: { data: NewStockDto[] | null; error: any } =
      await supabase
        .from('stock_movements')
        .select('id,created_at,product_id,type,quantity,reason,products(name)');
    if (error) throw new InternalServerErrorException();
    return data!;
  }

  async adjustStock(
    product_id: number,
    quantity_diff: number,
    reason: 'Cadastro' | 'Reposição' | 'Venda' | 'Ajuste',
    type: 'Entrada' | 'Saida',
  ) {
    const { error } = await supabase.rpc('adjust_stock', {
      product_id: product_id,
      quantity_diff: quantity_diff,
    });

    this.newStockMovement({
      product_id: product_id,
      type: type,
      quantity: quantity_diff,
      reason: reason,
    });

    if (error) throw new InternalServerErrorException(error);
  }
}
