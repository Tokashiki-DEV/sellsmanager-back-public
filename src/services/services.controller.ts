import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import {  ServicesDto } from './dto/service.dto';


@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async listarServicos() : Promise<ServicesDto[]> {
    return await this.servicesService.displayServices();
  }

  @Post()
  async cadastrarServico (@Body() serviceData: ServicesDto) : Promise<string>{
      await this.servicesService.registerService(serviceData);
      return "Serviço cadastrado com sucesso"
  }

  @Patch()
  async editarServico(@Body() serviceData: ServicesDto) : Promise<string> {
    await this.servicesService.changeService(serviceData)
    return "Serviço editado com sucesso"
  }

  @Patch(':id')
  async deletarServiço(@Param('id') id: number): Promise<string>{
    await this.servicesService.deleteService(id);
    return 'Serviço deletado com sucesso' 
  }
}
