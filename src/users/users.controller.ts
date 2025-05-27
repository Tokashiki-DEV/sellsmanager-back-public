import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/schemas.users.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDTO: CreateUserDto) : string {
    this.usersService.cadastrarUsuario(createUserDTO);
    return "Usuario cadastrado com sucesso"
  }

  @Get()
  displayUsers(): Promise<CreateUserDto[]> {
    return this.usersService.listarUsuarios();
  }
  
  @Patch(':id')
  async deleteUsers(@Param('id') id: number): Promise<string>{
    await this.usersService.deletarUsuario(id);
    return 'Usuario deletado com sucesso' 
  }
}
