import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Timestamp } from 'typeorm';

export class createsaleDto {
  order: createOrderDto;
  order_items: createOrderItemsDto[];
}

export interface salesDto {
  order: orderDto;
  order_items: orderItemsDto[];
}

export class createOrderDto {
  @IsNotEmpty()
  @IsNumber()
  employe_id: number;

  @IsNotEmpty()
  @IsNumber()
  customer_id: number;
}

export class createOrderItemsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  service_id: number;

  // @IsNotEmpty()
  // @IsNumber()
  // service_price: number;

  // @IsNotEmpty()
  // @IsNumber()
  // product_price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class changeOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  service_id: number;
}

export interface displayOrders {
  id: number;
  created_at: Timestamp;
  employe_id: number;
  customer_id: number;
  total_service_price: number;
  total_product_price: number;
}

export interface orderItemsDto {
  id: number;
  order_id: number;
  product_id: number;
  service_id: number;
  service_price: number;
  product_price: number;
  quantity: number;
}
export interface orderDto {
  id: number;
  created_at: Timestamp;
  employe_id: number;
  total_service_price: number;
  total_product_price: number;
  customer_id: number;
}

export interface item {
  id: number;
  name: string;
  category: string;
  brand: string;
  quantity: string;
  price: number;
}


export interface IOrderDto {
  employe_id: number;
  total_service_price: number;
  total_product_price: number;
  customer_id: number;
}

export class deleteOrderDTO {
  id: number;
}
