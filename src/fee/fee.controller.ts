import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { FeeService } from './fee.service';
import { changeFeeDto, createFeeDto, feeDto } from './dto/schema.dto';

@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get()
  async listarComissao(): Promise<feeDto[]> {
    return await this.feeService.displayFee();
  }

  @Post()
  async cadastrarComissao(@Body() feeData: createFeeDto): Promise<string> {
    await this.feeService.registerFee(feeData);
    return 'Comissão cadastrada com sucesso!';
  }

  @Patch(':id')
  async deletarComissao(@Param('id') fee_id: number): Promise<string> {
    await this.feeService.deleteFee(fee_id);
    return `Comissão de id: ${fee_id} deletado com sucesso`;
  }

  @Patch()
  async editarComissao(@Body() feeData: changeFeeDto): Promise<string> {
    await this.feeService.changeFee(feeData);
    return `Comissão editada com sucesso`;
  }
}
