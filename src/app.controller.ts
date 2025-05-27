import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('displaydata')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async GetAllData() {
    return await this.appService.GetAllData();
  }
}
