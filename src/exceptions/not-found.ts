import { HttpException } from "./http-exception.js";

export class NotFoundException extends HttpException {
	constructor(message: string) {
	  super(404, message);
	}
}