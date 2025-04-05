import { HttpException } from "./http-exception.js";

export class CustomError extends HttpException {
	constructor (message: string) {
		super(500, message);
	}
}