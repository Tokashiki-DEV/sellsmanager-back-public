import { Injectable, Param } from '@nestjs/common';
import { changeFeeDto, createFeeDto, feeDto } from './dto/schema.dto';
import { databaseFeeService } from 'src/database/database.fee.service';

@Injectable()
export class FeeService {
  constructor(private readonly databaseFeeService: databaseFeeService) {}

  async displayFee(): Promise<feeDto[]> {
    return await this.databaseFeeService.displayFee();
  }

  async registerFee(feedata: createFeeDto) {
    await this.databaseFeeService.registerFee(feedata);
  }
  async changeFee(feeData: changeFeeDto) {
    await this.databaseFeeService.changeFee(feeData);
  }

  async deleteFee(@Param('id') fee_id: number) {
    await this.databaseFeeService.deleteFee(fee_id);
  }
}
