import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/schemas.users.dto';
import { databaseUsersService } from 'src/database/database.users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly databaseUsersService: databaseUsersService) {}

  async cadastrarUsuario(CreateUserDto: CreateUserDto) {
    async function hashPassword(password) {
        return await bcrypt.hash(password, 2);
    }
   const hashedPassword = await hashPassword(CreateUserDto.password);

    this.databaseUsersService.registerUser(CreateUserDto, hashedPassword);
  }
  async listarUsuarios(): Promise<CreateUserDto[]> {
    return this.databaseUsersService.displayUsers();
  }

  async deletarUsuario(id: number){
    return this.databaseUsersService.deleteUsers(id);
  }
}
