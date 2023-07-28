import { User } from "../entities/User";
import database from "../loaders/database";

export const UserRepository = database.getRepository(User).extend({
  async getById(id: string) {
    return await this.findOne({ where: { id } });
  },
  async getByNickname(nickname: string) {
    return await this.findOne({ where: { nickname } });
  }
});
