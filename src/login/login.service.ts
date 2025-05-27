import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { databaseUsersService } from 'src/database/database.users.service';
import { secretKey } from 'src/env';

@Injectable()
export class LoginService {
    constructor(private readonly databaseUsersService: databaseUsersService) {}

    async handleLogin(username: string ,inputPassword: string): Promise<any> {
        const data = await this.databaseUsersService.findUserByUsername(username);
        const isLogged = await bcrypt.compare(inputPassword, data!.password);
        if( isLogged ) {
            const token = jwt.sign(
                { username: username, userId: data!.id },
                secretKey,
                { expiresIn: "1D" }
              );
              return {token: token, name: data!.name, role: data!.role };
        }
        if(!isLogged) {
            throw new UnauthorizedException("wrong password")
        }
    }
}

