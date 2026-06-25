import { Admin } from '@/types';
import { JsonRepository } from './base';

class AdminRepository extends JsonRepository<Admin> {
  constructor() {
    super('admins.json');
  }

  async findByLogin(login: string): Promise<Admin | null> {
    const all = await this.findAll();
    return all.find(a => a.login === login) ?? null;
  }
}

export const adminRepository = new AdminRepository();
