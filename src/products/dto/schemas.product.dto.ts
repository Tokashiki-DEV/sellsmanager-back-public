import { Optional } from '@nestjs/common';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class CreateproductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  brand: string;
}

export interface singleProductPriceDto {
  price: number;
}

export interface productDatabaseInterface {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
}

export class productDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  brand: string;
}
