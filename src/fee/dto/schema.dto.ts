import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class feeDto {
  id: number;
  name: string;
  value: string;
}

export class createFeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: string;
}

export class changeFeeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  is_used: boolean;
}
