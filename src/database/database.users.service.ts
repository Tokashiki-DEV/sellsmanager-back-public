import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IUser } from './dto/schemas.dto';
import supabase from './database';
import { CreateUserDto } from 'src/users/dto/schemas.users.dto';

@Injectable()
export class databaseUsersService {
    async findUserByUsername(username: string): Promise<undefined | IUser>{
        const { data, error } = await supabase.from("users").select().eq("username", username);
        
        if(data === null || data.length === 0) {
            throw new NotFoundException("user not found");
        }

        return data[0];
    }
    
    async registerUser(CreateUserDto: CreateUserDto, hashPassword: string) {
        const userPayload = {
            name: CreateUserDto.name,
            password: hashPassword,
            username: CreateUserDto.username,
            role: CreateUserDto.role
        }
        const { error } = await supabase.from("users").insert(userPayload);
        
        if(error) {
            throw new InternalServerErrorException();
        }
    }

    async displayUsers() {
        const { data, error } = await supabase.from("users").select('*');

        if( error ) {
            throw new InternalServerErrorException();
        }

        return data;
    }

    async deleteUsers( id: number ){
        const { data, error } = await supabase.from("users").select().eq("id", id);
        if(data!.length === 0 || data === null){
            throw new NotFoundException("user not found");
        }

        try{
            await supabase.from("users").delete().eq("id", id);
        } catch( error ) { throw new InternalServerErrorException("error while deleting user") }
        
    }
    
}
