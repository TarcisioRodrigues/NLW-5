import { io } from '../http';
import { ConnectionsServices } from '../services/ConnectionsServices';
import { UsersServices } from '../services/UsersServices';
import { MessageServices } from '../services/MessageServices';
interface IParams {
  text: string;
  email: string;
}
io.on('connect', (socket) => {
  const connectionServices = new ConnectionsServices();
  const usersService = new UsersServices();
  const messagesService = new MessageServices();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    const userExistis = await usersService.create(email);
    let user_id = null;
    if (!userExistis) {
      const user = await usersService.create(email);
      user_id = user.id;
    } else {
      user_id = userExistis.id;
      const connection = await connectionServices.findByUserId(userExistis.id);
      if (!connection) {
        await connectionServices.create({
          socket_id,
          user_id: userExistis.id,
          //Salvar conexão com user_id,socket_id
        });
      } else {
        connection.socket_id = socket_id;
        await connectionServices.create(connection);
      }
    }
    await messagesService.create({
      text,
      user_id,
    });
  });
});
