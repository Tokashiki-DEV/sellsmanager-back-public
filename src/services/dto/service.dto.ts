import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ServicesDto {
  @IsOptional()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  price: number;
}

export interface serviceInterface {
  id: number;
  name: string;
  price: number;
}
