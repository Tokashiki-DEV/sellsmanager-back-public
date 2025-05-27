import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, displayEmployeeSalesDto, EditEmployeeDto, IDisplayEmployeeSales } from './dto/employee.dto';
import { databaseEmployeeService } from 'src/database/database.employee.service';
import { databaseSalesService } from 'src/database/database.sales.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly databaseEmployeeService: databaseEmployeeService,
    private readonly databaseSalesService: databaseSalesService,
  ) {}
  async displayEmployee() {
    return await this.databaseEmployeeService.displayEmployee();
  }

  async displayEmployeSales(dateFilters: displayEmployeeSalesDto) : Promise<IDisplayEmployeeSales[]> {
    return await this.databaseSalesService.displayEmployeSales(dateFilters);
  }

  async criarFuncionario(name: string) {
    await this.databaseEmployeeService.createEmploye(name);
  }

  async editarFuncionario(editEmployeeDto: EditEmployeeDto) {
    await this.databaseEmployeeService.editEmploye(editEmployeeDto);
  }
  async deletarFuncionario(id: number) {
    await this.databaseEmployeeService.deleteEmploye(id);
  }
  

}
