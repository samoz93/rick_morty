import { ExpectedError } from "../models";
class LogService {
  logError(error: unknown) {
    // TODO: Send error to server
    if (error instanceof ExpectedError) {
      console.error("ExpectedError", error.originalError);
    } else {
      console.error("UnexpectedError!", error);
    }
  }
}

export const logService = new LogService();
