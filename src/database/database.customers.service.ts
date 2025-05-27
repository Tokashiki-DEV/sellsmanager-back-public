import { Injectable, InternalServerErrorException } from '@nestjs/common';
import supabase from './database';
import { ICustomers, ICustomersOrders } from './dto/schemas.dto';
import {
  createCustomerDTO,
  changeCustomerDTO,
} from 'src/customers/dto/customers.dto';
import { promises } from 'dns';

@Injectable()
export class databaseCustomersService {
  async displayCustomers(): Promise<ICustomers[] | null> {
    const { data, error }: { data: ICustomers[] | null; error: any } =
      await supabase.from('customers').select('*');
    if (error) throw new InternalServerErrorException();
    return data;
  }

  async displayBestCustomers(name?: string) {
    let query = supabase
      .from('customers')
      .select('*')
      .not('total_spend', 'is', null)
      .gte('total_spend', 10000)
      .order('total_spend', { ascending: false });

    if (name) {
      query = query.ilike('name', `%${name}%`);
    }
    const { data, error } = await query;
    if (error) throw new InternalServerErrorException();
    return data;
  }

  async registerCustomer(customerData: createCustomerDTO): Promise<number> {
    const { data, error }: { data: ICustomers[] | null; error: any } =
      await supabase.from('customers').insert(customerData).select();
    if (error) throw new InternalServerErrorException();
    return data![0].id;
  }

  async deleteCustomerDatabase(id: number) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', Number(id));
    if (error) throw new InternalServerErrorException(error);
  }

  async updateCustomer(customerChangeData: changeCustomerDTO): Promise<string> {
    const payload = {
      name: customerChangeData.name,
      email: customerChangeData.email,
      phone: customerChangeData.phone,
    };
    const { error } = await supabase
      .from('customers')
      .update(payload)
      .eq('id', customerChangeData.id);
    if (error) throw new InternalServerErrorException();
    return 'cliente alterado com sucesso';
  }
}
