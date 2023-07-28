import { Service } from "typedi";
import {
  Body,
  HttpCode,
  JsonController,
  Post,
  Req,
} from "routing-controllers";
import { CreateUserDto, LoginUserDto } from "../dtos/UserDto";
import {UserService} from "../services/UserService"
import { createResponseForm } from "../interceptors/transformer";
import { Request } from "express";


@JsonController("/auth")
@Service()
export class UserController {
    constructor(private readonly _userService:UserService){}
    @HttpCode(201)
    @Post("/register")
    public async register(@Body() createUserDto : CreateUserDto) {
       try{
        await this._userService.register(createUserDto);
        return createResponseForm(undefined);
       }catch(error) {
        console.log(error);
       }
    }
    @HttpCode(201)
    @Post("/login")
    public async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request) {
      try{
        await this._userService.login(loginUserDto);
        const sessionData = req.session.user = {
          nickname: loginUserDto.nickname,
        };
        return createResponseForm(sessionData);
      }catch(error){
        console.log(error);
      }
    }
}