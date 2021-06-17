import { Request, Response } from 'express';
import { EntityRepository, Repository } from 'typeorm';
import { UsersServices } from '../services/UsersServices';
class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const usersService = new UsersServices();

    const user = await usersService.create(email);

    return response.json(user);
  }
}

export { UserController };
