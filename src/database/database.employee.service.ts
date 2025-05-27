import { Injectable, InternalServerErrorException } from '@nestjs/common';
import supabase from './database';
import { databaseFeeService } from './database.fee.service';
import {
  EditEmployeeDto,
  IDisplayEmployee,
} from 'src/employee/dto/employee.dto';

@Injectable()
export class databaseEmployeeService {
  constructor(private readonly databaseFeeService: databaseFeeService) {}
  async displayEmployee() {
    const employee = await supabase.from('employee').select();
    const fee = await this.databaseFeeService.displayFee();
    if (employee.error) throw new InternalServerErrorException(employee.error);
    const employeeNotDeleted = employee.data.filter(
      (item: IDisplayEmployee) => item.is_deleted === false,
    );
    // const employeeNotDeleted = employee.data.map((item: IDisplayEmployee) => {
    //   if (item.is_deleted === false) {
    //     return item;
    //   }
    // });
    const toBeReturned = {
      employee_data: employeeNotDeleted,
      fee_data: fee,
    };
    return toBeReturned;
  }
  async createEmploye(name: string) {
    const { error } = await supabase.from('employee').insert({ name: name });
    if (error) throw new InternalServerErrorException();
  }
  async editEmploye(editEmployeeDto: EditEmployeeDto) {
    const payload = {
      id: editEmployeeDto.id,
      name: editEmployeeDto.name,
    };
    const { error } = await supabase
      .from('employee')
      .update(payload)
      .eq('id', editEmployeeDto.id);

    if (error) throw new InternalServerErrorException();
  }
  async deleteEmploye(id: number) {
    const { error } = await supabase
      .from('employee')
      .update({ is_deleted: true })
      .eq('id', id);
    if (error) throw new InternalServerErrorException();
  }
}
