import { Injectable } from '@nestjs/common';
import { databaseProductsService } from 'src/database/database.products.service';
import { CreateproductDto, productDto } from './dto/schemas.product.dto';
import { StockService } from 'src/stock/stock.service';
import { NewStockDto } from 'src/stock/dto/stock.dto';


@Injectable()
export class ProductsService {
  constructor(private readonly databaseProductsService: databaseProductsService, private readonly stockService: StockService) {}

  async cadastrarProduto(createproductDto: CreateproductDto){
    const product_id: number = await this.databaseProductsService.registerProduct(createproductDto);

    const newStockMovement: NewStockDto = {
      quantity: createproductDto.quantity,
      type: "Entrada",
      reason: "Cadastro",
      product_id: product_id
    }
    
    await this.stockService.createStockMovement(newStockMovement);
  }
  listarProduto(): Promise<CreateproductDto[]>{
    return this.databaseProductsService.displayProducts();
  }
  deletarProduto(id: number){
    return this.databaseProductsService.deleteProducts(id);
  }
  alterarProduto(productDto: productDto){
    this.databaseProductsService.changeProduct(productDto);
  }
}
