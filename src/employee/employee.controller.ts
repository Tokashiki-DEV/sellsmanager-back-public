import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  displayEmployeeSalesDto,
  EditEmployeeDto,
  IDisplayEmployeeSales,
} from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async listarFuncionarios() {
    return await this.employeeService.displayEmployee();
  }

  @Get('sales')
  async listarVendasDeFuncionarios(
    @Query() dateFilters: displayEmployeeSalesDto,
  ): Promise<IDisplayEmployeeSales[]> {
    return await this.employeeService.displayEmployeSales(dateFilters);
  }

  @Post()
  async createEmploye(@Body() createEmployeeDto: CreateEmployeeDto) {
    await this.employeeService.criarFuncionario(createEmployeeDto.name);
    return 'employe created';
  }

  @Patch()
  async editEmploye(@Body() editEmployeeDto: EditEmployeeDto) {
    await this.employeeService.editarFuncionario(editEmployeeDto);
    return 'employe edited';
  }

  @Patch(':id')
  async deleteEmploye(@Param('id') id: number) {
    await this.employeeService.deletarFuncionario(id);
    return 'employe deleted';
  }
}
