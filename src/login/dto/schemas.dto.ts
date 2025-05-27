import { IsEnum, IsNotEmpty ,IsOptional } from "class-validator";

enum roleGroupEnum {
    admin = 'admin',
    employe = 'employe'
}

export class userLoginInterface {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}   
