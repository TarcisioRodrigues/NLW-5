import { Request, Response } from 'express';
import { MessageServices } from '../services/MessageServices';

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;
    const messagesServices = new MessageServices();
    const message = await messagesServices.create({
      admin_id,
      text,
      user_id,
    });
    return response.json(message);
  }
  async showByUse(request: Request, response: Response) {
    const { id } = request.params;
    const messagesServices = new MessageServices();
    const list = await messagesServices.listByUse(id);
    return response.json(list);
  }
}

export { MessagesController };
