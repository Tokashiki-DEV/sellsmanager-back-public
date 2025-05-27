import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateproductDto, productDto } from './dto/schemas.product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  createProduct(@Body() createproductDto: CreateproductDto): string {
    this.productsService.cadastrarProduto(createproductDto);
    return 'Produto cadastrado com sucesso';
  }

  @Get()
  displayProduct(): Promise<CreateproductDto[]> {
    return this.productsService.listarProduto();
  }

  @Patch()
  async changeProductInfo(@Body() productDto: productDto): Promise<string> {
    this.productsService.alterarProduto(productDto);
    return `Produto ID: ${productDto.id} foi alterado com sucesso`;
  }

  @Patch(':id')
  async deleteProduct(@Param('id') id: number): Promise<string> {
    await this.productsService.deletarProduto(id);
    return `Produto ID: ${id} deletado com sucesso`;
  }
}
