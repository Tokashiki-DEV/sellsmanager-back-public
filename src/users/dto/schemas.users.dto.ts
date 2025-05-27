import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @Length(10, 30)
    password: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @IsEnum({admin: 'admin', employe: 'employe'})
    role: 'admin' | 'employe'
}
