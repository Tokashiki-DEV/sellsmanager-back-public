import {  Body, Controller, Post } from '@nestjs/common';
import { userLoginInterface } from './dto/schemas.dto';
import { LoginService } from './login.service';


@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() bodyUserLogin: userLoginInterface): Promise<string | userLoginInterface> {
        const loggedUser = await this.loginService.handleLogin(bodyUserLogin.username, bodyUserLogin.password);
        return loggedUser;
    }
    
}

 
