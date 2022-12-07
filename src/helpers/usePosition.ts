import { Connections } from '../types';
export default function (
  connections: Connections[],
  message_id: number,
  button_id: number
) {
  const mass = [];

  if (!connections) return 0;
  for (const connection of connections) {
    if (connection.message_id === message_id) mass.push(connection.button_id);
  }

  return mass.indexOf(button_id);
}
