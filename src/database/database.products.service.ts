import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import supabase from './database';
import {
  CreateproductDto,
  productDatabaseInterface,
  productDto,
  singleProductPriceDto,
} from 'src/products/dto/schemas.product.dto';

@Injectable()
export class databaseProductsService {
  async registerProduct(createproductDto: CreateproductDto): Promise<number> {
    const productPayload = {
      name: createproductDto.name,
      price: createproductDto.price,
      quantity: createproductDto.quantity,
      category: createproductDto.category,
      brand: createproductDto.brand,
    };
    const { data, error }: { data: productDto[] | null; error: any } =
      await supabase.from('products').insert(productPayload).select();
    if (error) {
      throw new InternalServerErrorException();
    }
    return data![0].id;
  }

  async displaySingleProductPriceById(product_id: number): Promise<number> {
    const {
      data,
      error,
    }: { data: singleProductPriceDto[] | null; error: any } = await supabase
      .from('products')
      .select('price')
      .eq('id', product_id);
    if (error)
      throw new InternalServerErrorException(
        'Error in displaySingleProductPriceById',
      );
    return data![0].price;
  }

  async displayProducts() {
    const { data, error } = await supabase.from('products').select();
    if (error) {
      throw new InternalServerErrorException();
    }

    return data;
  }
  async displayProductById(
    product_id: number,
  ): Promise<productDatabaseInterface[]> {
    const {
      data,
      error,
    }: { data: productDatabaseInterface[] | null; error: any } = await supabase
      .from('products')
      .select()
      .eq('id', product_id);

    if (error || data?.length === 0) throw new InternalServerErrorException();

    return data!;
  }
  async deleteProducts(id: number) {
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('id', id);
    if (data!.length === 0 || data === null) {
      throw new NotFoundException('product not found');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
    } catch (error) {
      throw new InternalServerErrorException('error while deleting product');
    }
  }
  async changeProduct(productDto: productDto) {
    const updatePayload = {
      name: productDto.name,
      price: productDto.price,
      quantity: productDto.quantity,
      brand: productDto.brand,
    };
    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', productDto.id);

    if (error) throw new InternalServerErrorException(error);
  }
}
