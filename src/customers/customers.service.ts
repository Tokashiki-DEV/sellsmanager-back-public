import { Injectable } from '@nestjs/common';
import { databaseCustomersService } from 'src/database/database.customers.service';
import { changeCustomerDTO, createCustomerDTO } from './dto/customers.dto';
@Injectable()
export class CustomersService {
  constructor(
    private readonly databaseCustomersService: databaseCustomersService,
  ) {}

  async displayCustomers() {
    return await this.databaseCustomersService.displayCustomers();
  }

  async displayBestCustomers(name: string | undefined) {
    return await this.databaseCustomersService.displayBestCustomers(name);
  }

  async registerCustomer(customerData: createCustomerDTO): Promise<number> {
    const id =
      await this.databaseCustomersService.registerCustomer(customerData);
    return id;
  }

  async deleteCustomer(id: number) {
    await this.databaseCustomersService.deleteCustomerDatabase(id);
    return `Cliente de ID ${id} deletado com sucesso`;
  }

  async updateCustomer(customerChangeData: changeCustomerDTO): Promise<string> {
    return await this.databaseCustomersService.updateCustomer(
      customerChangeData,
    );
  }
}
