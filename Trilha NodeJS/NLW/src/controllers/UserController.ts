import { Request, Response } from 'express';
import { EntityRepository, Repository } from 'typeorm';
import { UsersService } from '../services/UsersServices';
class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const usersService = new UsersService();

    const user = await usersService.create(email);

    return response.json(user);
  }
}

export { UserController };
