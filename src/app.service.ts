import { Injectable } from '@nestjs/common';
import { databaseEmployeeService } from './database/database.employee.service';
import { databaseCustomersService } from './database/database.customers.service';
import { databaseProductsService } from './database/database.products.service';
import { databaseServicesService } from './database/database.services.service';

@Injectable()
export class AppService {
  constructor(
    private readonly databaseEmployeeService: databaseEmployeeService,
    private readonly databaseCustomersService: databaseCustomersService,
    private readonly databaseProductsService: databaseProductsService,
    private readonly databaseServicesService: databaseServicesService,
  ) {}
  async GetAllData() {
    const res = {
      Employee: await this.databaseEmployeeService.displayEmployee(),
      Customers: await this.databaseCustomersService.displayCustomers(),
      Products: await this.databaseProductsService.displayProducts(),
      Services: await this.databaseServicesService.displayServices(),
    };
    return res;
  }
}
