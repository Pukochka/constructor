import { useDataStore } from '../stores/DataStore/Data';
import { useVectorStore } from '../stores/VectorStore/Vector';

import usePosition from './usePosition';
import useVectorConnect from './useVectorConnect';

export default function (is_init: boolean) {
  const vector = useVectorStore();
  const main = useDataStore();
  for (const { message_id, button_id } of main.SelectRoute.lines) {
    const position = usePosition(main.SelectRoute.lines, message_id, button_id);
    const line = useVectorConnect(message_id, button_id, position, is_init);
    vector.ApplyLine(line, button_id);
  }
}
