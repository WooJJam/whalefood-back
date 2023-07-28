import { Consulting } from "../entities/Consulting";
import database from "../loaders/database";

export const ConsultingRepository = database.getRepository(Consulting).extend({
  async getById(id: string) {
    return await this.findOne({ where: { id } });
  },
  async getsById(id: string) {
    return await 
    this.createQueryBuilder('consulting')
    .where('consulting.userId = :id', { id })
    .getMany();
  },
});
