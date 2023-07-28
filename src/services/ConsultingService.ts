import {Service} from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { ConsultingRepository } from "../repositories/ConsultingRepository";
import { CreateConsultingDto } from "../dtos/ConsultingDto";

@Service()
export class ConsultingService{
    constructor(
        private readonly _consultingRepository: typeof ConsultingRepository,
        private readonly _userRepository: typeof UserRepository
        ) {
        this._consultingRepository = ConsultingRepository;
        this._userRepository = UserRepository;
    }
    public async chatConsulting(nickname:string, createConsultingDto:CreateConsultingDto) {
        const {title, content} = createConsultingDto;
        const user = await this._userRepository.getByNickname(nickname);
        return this._consultingRepository.save(this._consultingRepository.create({title, content, user}));
    }
    public async consultingList(nickname:string) {
        const user = await this._userRepository.getByNickname(nickname);
        return await this._consultingRepository.getsById(user.id);
    }
}