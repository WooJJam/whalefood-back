import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { AgeType, GenderType, SexPrefType } from "../type";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    public nickname: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
    
    @IsNotEmpty()
    @IsString()
    public gender: GenderType;

    @IsNotEmpty()
    @IsNumber()
    public age: AgeType;

    @IsNotEmpty()
    @IsNumber()
    public sexpref: SexPrefType;
}

export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    public nickname: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}
