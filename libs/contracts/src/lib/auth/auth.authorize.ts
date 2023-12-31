/* eslint-disable @typescript-eslint/no-namespace */
import { TokenPayload } from '@scraping-app/interfaces';
import { UserEntity } from '@scraping-app/models';

export namespace AuthAuthorize {
    export const queue = 'auth';

	export const topic = 'auth.authorize.command';

    export const injectionToken = 'auth';

	export class Request {
        Authorization : TokenPayload
    
	}

	export class Response {
		user: UserEntity;
	}
}