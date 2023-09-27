/* eslint-disable @typescript-eslint/no-namespace */
import { ProductCard, ScrappingRequest, TokenPayload } from '@scraping-app/interfaces'

export namespace ScrappingScrapping {
    export const queue = 'scrapping';

	export const topic = 'scrapping.scrapping.query';

    export const injectionToken = 'scrapping';

	export class Request implements ScrappingRequest{
        productQuery: string;
        url: string;
        Authorization: string;
}

	export class Response implements ProductCard {
        url: string;
        title: string;
        price: number;
        picture?: string | undefined;
        description?: string | undefined;
        createDate?: Date | undefined;
    }
}