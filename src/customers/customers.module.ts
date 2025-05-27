import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { databaseModule } from 'src/database/database.module';

@Module({
  imports: [databaseModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
