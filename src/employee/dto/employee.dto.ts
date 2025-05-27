import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { salesDto } from 'src/sales/dto/sales.dto';
import { Timestamp } from 'typeorm';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class EditEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class displayEmployeeSalesDto {
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  start_date: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  end_date: string;
}

export interface IDisplayEmployeeSales {
  employe_id: number;
  name: string;
  sales: salesDto[];
}

export interface IDisplayEmployee {
  id: number;
  created_at: any;
  name: string;
  is_deleted: boolean;
}
