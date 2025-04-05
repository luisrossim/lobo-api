import { HttpException } from "./http-exception.js";

export class InvalidArgumentsException extends HttpException {
    constructor(message: string) {
      super(400, message);
    }
}