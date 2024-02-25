// Error's that can be easily handled by the application should be thrown as ExpectedError
export class ExpectedError extends Error {
  name: string;
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "ExpectedError";
  }

  getFormattedError() {
    return `${this.name}: ${this.message}`;
  }
}
