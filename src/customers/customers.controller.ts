import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { createCustomerDTO, changeCustomerDTO } from './dto/customers.dto';
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async listarClientes() {
    return await this.customersService.displayCustomers();
  }

  @Get('best')
  async listarMelhoresClientes(@Query('name') name?: string | undefined) {
    return await this.customersService.displayBestCustomers(name);
  }

  @Post()
  async cadastrarCliente(
    @Body() customerData: createCustomerDTO,
  ): Promise<number> {
    const id = await this.customersService.registerCustomer(customerData);
    return id;
  }

  @Patch()
  async deletarCLiente(@Body() body: { id: number }): Promise<string> {
    const { id } = body;
    return await this.customersService.deleteCustomer(id);
  }
  @Patch('update')
  async alterarCliente(
    @Body() customerChangeData: changeCustomerDTO,
  ): Promise<string> {
    return await this.customersService.updateCustomer(customerChangeData);
  }
}
