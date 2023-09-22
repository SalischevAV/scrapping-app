import { ScrapingService } from './scraping.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('scraping')
export class ScrapingController {
    constructor(private readonly scrapingService: ScrapingService){}

    @Get('products')
    getProducts(@Query('productQuery') productQuery: string, @Query('url' )url: string){
        return this.scrapingService.getProducts(productQuery, url);
    }

    @Get('results')
    getResults(@Query('productQuery') productQuery: string, @Query('url' )url: string){
        return this.scrapingService.getResults(productQuery, url);
    }
}
