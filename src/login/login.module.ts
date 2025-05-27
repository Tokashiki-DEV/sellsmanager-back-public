import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { databaseModule } from 'src/database/database.module';


@Module({
    imports: [databaseModule],
    controllers: [LoginController],
    providers: [LoginService]
})
export class LoginModule {}
