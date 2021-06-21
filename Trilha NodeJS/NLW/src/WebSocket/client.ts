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
    const allMessages = await messagesService.listByUse(user_id);
    socket.emit('client_list_all_messages', allMessages);
    const allUsers = await connectionServices.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { socket_admin_id, text } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionServices.findBySocketID(socket_id);
    const message = await messagesService.create({
      text,
      user_id,
    });
    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
