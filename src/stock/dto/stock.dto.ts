import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

enum TypeEnum  {
    Entrada = 'Entrada',
    Saida = 'Saida'
}

enum ReasonEnum  {
    Cadastro = 'Cadastro',
    Reposição = 'Reposição',
    Venda = 'Venda'
} 

export class NewStockDto {
    @IsNotEmpty()
    @IsNumber()
    product_id: number

    @IsNotEmpty()
    @IsString()
    @IsEnum(TypeEnum)
    type: 'Entrada' | 'Saida'
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(ReasonEnum)
    reason: 'Cadastro' | 'Reposição' | 'Venda' | 'Ajuste'
}

