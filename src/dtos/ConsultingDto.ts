import { IsNotEmpty, IsString, IsEmail, IsNumber } from "class-validator";

export class CreateConsultingDto{
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public content: string;
}

export class ChatDto{
    @IsNotEmpty()
    @IsString()
    public systemContent: string;

    @IsNotEmpty()
    @IsString()
    public userContent: string;
}

