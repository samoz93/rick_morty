import { ExpectedError } from "../models";

// Fake logging service
class LogService {
  logError(error: unknown) {
    if (error instanceof ExpectedError) {
      console.error("ExpectedError", error.originalError);
    } else {
      console.error("UnexpectedError!", error);
    }
  }
}

export const logService = new LogService();
