import { Injectable } from '@nestjs/common';
import { databaseServicesService } from 'src/database/database.services.service';
import { ServicesDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
    constructor(private readonly databaseServicesService: databaseServicesService) {}
    async displayServices(): Promise<ServicesDto[]> {
        return await this.databaseServicesService.displayServices()
    }
    async registerService(serviceData: ServicesDto) {
        await this.databaseServicesService.registerService(serviceData)
    }
    async changeService(serviceData: ServicesDto) {
        await this.databaseServicesService.changeService(serviceData)
    }
    async deleteService(id: number) {
        await this.databaseServicesService.deleteService(id)
    }
}
