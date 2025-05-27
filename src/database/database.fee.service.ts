import { Injectable, InternalServerErrorException } from '@nestjs/common';
import supabase from './database';
import { changeFeeDto, createFeeDto, feeDto } from 'src/fee/dto/schema.dto';

@Injectable()
export class databaseFeeService {
  async displayFee(): Promise<feeDto[]> {
    const { data, error }: { data: feeDto[] | null; error: any } =
      await supabase.from('fee').select('*');
    if (error) throw new InternalServerErrorException();
    return data!;
  }

  async registerFee(feedata: createFeeDto) {
    const { error } = await supabase.from('fee').insert(feedata);
    if (error) throw new InternalServerErrorException();
  }

  async deleteFee(fee_id: number) {
    const { error } = await supabase.from('fee').delete().eq('id', fee_id);
    if (error) throw new InternalServerErrorException();
  }

  async changeFee(feedata: changeFeeDto) {
    const { error } = await supabase
      .from('fee')
      .update({
        name: feedata.name,
        value: feedata.value,
        is_used: feedata.is_used,
      })
      .eq('id', feedata.id);

    if (error) throw new InternalServerErrorException(error);
  }
}
