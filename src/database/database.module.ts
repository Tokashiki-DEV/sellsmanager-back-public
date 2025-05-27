import { Module } from '@nestjs/common';
import { databaseCustomersService } from './database.customers.service';
import { databaseProductsService } from './database.products.service';
import { databaseUsersService } from './database.users.service';
import { databaseStockService } from './database.stock.service';
import { databaseServicesService } from './database.services.service';
import { databaseFeeService } from './database.fee.service';
import { databaseEmployeeService } from './database.employee.service';
import { databaseSalesService } from './database.sales.service';

@Module({
  imports: [],
  providers: [
    databaseCustomersService,
    databaseProductsService,
    databaseUsersService,
    databaseStockService,
    databaseServicesService,
    databaseFeeService,
    databaseEmployeeService,
    databaseSalesService,
  ],
  exports: [
    databaseCustomersService,
    databaseProductsService,
    databaseUsersService,
    databaseStockService,
    databaseServicesService,
    databaseFeeService,
    databaseEmployeeService,
    databaseSalesService,
  ],
})
export class databaseModule {}
