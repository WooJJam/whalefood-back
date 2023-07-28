import { Service } from "typedi";
import {
    Body,
  HttpCode,
  JsonController,
  Post,
  Req,
  UseBefore
} from "routing-controllers";
import { ConsultingService } from "../services/ConsultingService";
import { ChatDto, CreateConsultingDto } from "../dtos/ConsultingDto";
import { logger } from "../utils/Logger";
import { createResponseForm } from "../interceptors/transformer";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { Request } from "express";
import axios from "axios";
import { env } from "../loaders/env"
const { api } = env;

@UseBefore(AuthMiddleware)
@JsonController("/consulting")
@Service()
export class ConsultingController {
    constructor(private readonly _consultingService:ConsultingService){}

    @HttpCode(201)
    @Post("/chat")
    public async chatGpt(@Body() chatDto: ChatDto) {
       try{
        const {systemContent, userContent} = chatDto;
        const response = await axios.post('https://api.openai.com/v1/chat/completions',{
          "model": "gpt-3.5-turbo",
          "messages": [
           {
              "role": "system", 
              "content": `${systemContent}`
            },
            {
              "role": "user", 
              "content": `${userContent}`
            }
          ],
          "temperature": 0.7
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api.gptkey}`
          }
        })
        const data = response.data.choices[0].message.content;
        return createResponseForm(data);
       }catch(error) {
        logger.error(error);
       }
    }

    @HttpCode(201)
    @Post("/save")
    public async chatConculting(@Body() createConsultingDto:CreateConsultingDto, @Req() req:Request) {
       try{
        const nickname = req.session.user.nickname;
        const data = await this._consultingService.chatConsulting(nickname, createConsultingDto);
        return createResponseForm(data);
       }catch(error) {
        logger.error(error);
       }
    }

    @HttpCode(201)
    @Post("/list")
    public async consultingList(@Req() req:Request) {
       try{
        const nickname = req.session.user.email;
        const data = await this._consultingService.consultingList(nickname);
        return createResponseForm(data);
      }catch(error) {
        console.log(error);
      }
    }
}