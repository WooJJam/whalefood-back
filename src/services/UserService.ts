import {Service} from "typedi";
import {CreateUserDto, LoginUserDto} from "../dtos/UserDto"
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class UserService{
    constructor(private readonly _userRepositroy: typeof UserRepository) {
        this._userRepositroy=UserRepository;
    }
    public async register(createUserDto: CreateUserDto) {
        const {nickname, password, gender, age, sexpref} = createUserDto;
        return await this._userRepositroy.save(this._userRepositroy.create({nickname,password,gender,age,sexpref}));
    }
    public async login(loginUserDto: LoginUserDto) {
        const {nickname, password} = loginUserDto;
        const user = await this._userRepositroy.getByNickname(nickname);
        if(user && password === user.password) {
            return true;
        }else {
            return false;
        }
    }
}