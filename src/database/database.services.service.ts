import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import supabase from './database';
import {
  CreateproductDto,
  productDto,
} from 'src/products/dto/schemas.product.dto';
import { ServicesDto, serviceInterface } from 'src/services/dto/service.dto';

@Injectable()
export class databaseServicesService {
  async displayServices(): Promise<serviceInterface[]> {
    const { data, error }: { data: ServicesDto[] | null; error: any } =
      await supabase.from('services').select('*');
    if (error) throw new InternalServerErrorException();
    return data!;
  }

  async displayServicesById(service_id: number): Promise<serviceInterface> {
    const { data, error }: { data: ServicesDto[] | null; error: any } =
      await supabase.from('services').select('*').eq('id', service_id);

    if (error) throw new InternalServerErrorException();
    return data![0];
  }

  async registerService(serviceData: ServicesDto) {
    const payload = {
      id: serviceData.id,
      name: serviceData.name,
      price: serviceData.price,
    };
    const { error } = await supabase.from('services').insert(payload);
    if (error) throw new InternalServerErrorException();
  }

  async changeService(serviceData: ServicesDto) {
    const payload = {
      id: serviceData.id,
      name: serviceData.name,
      price: serviceData.price,
    };
    const { error } = await supabase
      .from('services')
      .update(payload)
      .eq('id', serviceData.id);
    if (error) throw new InternalServerErrorException();
  }

  async deleteService(service_id: number) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', service_id);

    if (error) throw new InternalServerErrorException();
  }
}
