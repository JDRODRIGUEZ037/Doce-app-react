// Error controlado que incluye código de estado HTTP personalizado
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
