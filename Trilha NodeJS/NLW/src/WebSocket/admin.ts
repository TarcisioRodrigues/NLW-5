import { io } from '../http';
import { ConnectionsServices } from '../services/ConnectionsServices';
import { MessageServices } from '../services/MessageServices';

io.on('connect', async (socket) => {
  const connectionsService = new ConnectionsServices();
  const messagesService = new MessageServices();
  const allConnectionsWithoutAdmin =
    await connectionsService.findAllWithoutAdmin();
  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  socket.on('admin_list_messages_all_users', async (params, callback) => {
    const { user_id } = params;
    const allMessages = await messagesService.listByUse(user_id);
    callback(allMessages);
  });
  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;
    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });
    const { socket_id } = await connectionsService.findByUserId(user_id);
    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });
  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;
    await connectionsService.updateAdminId(user_id, socket.id);
    const allConnectionsWithoutAdmin =
      await connectionsService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  });
});
