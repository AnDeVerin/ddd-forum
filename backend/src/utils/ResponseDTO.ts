export class ResponseDTO<T> {
  public success: boolean;

  constructor(public data: T, public error: string | undefined) {
    this.success = !error;
  }
}
