import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { LoginModule } from './login/login.module';
import { databaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { ServicesModule } from './services/services.module';
import { StockModule } from './stock/stock.module';
import { FeeModule } from './fee/fee.module';
import { EmployeeModule } from './employee/employee.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { salesModule } from './sales/sales.module';

@Module({
  imports: [
    LoginModule,
    databaseModule,
    UsersModule,
    ProductsModule,
    CustomersModule,
    ServicesModule,
    StockModule,
    FeeModule,
    EmployeeModule,
    salesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        {
          path: 'login',
          method: RequestMethod.ALL,
        },
        {
          path: 'users',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
