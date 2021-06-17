import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

class UsersServices {
  private usersRepository: Repository<User>;
  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }
  async create(email: string) {
    //Verificar se o usuario existe
    const userExists = await this.usersRepository.findOne({});
    //Se existir retornar o id
    if (userExists) {
      return userExists;
    }
    const user = this.usersRepository.create({
      email,
    });
    //Se não existir salvar no banco de dados
    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersServices };
