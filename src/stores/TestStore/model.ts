import { MessageInstance } from "../../types";
export interface TestStore {
  READY_TO_TEST: MessageInstance[];
  ACTIVE_MESSAGE: MessageInstance;
  ALL_MESSAGES: MessageInstance[];
}