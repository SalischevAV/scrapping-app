/* eslint-disable @typescript-eslint/no-namespace */
import { CreateUserDto } from '@scraping-app/dtos';
import { UserEntity } from '@scraping-app/models';

export namespace AuthRegister {
    export const queue = 'auth';

	export const topic = 'auth.register.command';

    export const injectionToken = 'auth';

	export class Request extends CreateUserDto{}

	export class Response {
		user: UserEntity;
	}
}