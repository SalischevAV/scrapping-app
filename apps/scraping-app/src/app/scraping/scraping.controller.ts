import { CommonJwtAuthGuard } from '@scraping-app/libs/auth';
import { ScrapingService } from './scraping.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@scraping-app/nest-decorators';
import { UserEntity } from '@scraping-app/models';

@Controller('scraping')
export class ScrapingController {
    constructor(private readonly scrapingService: ScrapingService){}

    @Get('products')
    @UseGuards(CommonJwtAuthGuard)
    getProducts(@Query('productQuery') productQuery: string, @Query('url')url: string, @CurrentUser() user: UserEntity){
        return this.scrapingService.getProducts(productQuery, url, user.id);
    }

    @Get('results')
    @UseGuards(CommonJwtAuthGuard)
    getResults(@Query('productQuery') productQuery: string, @Query('url')url: string){
        return this.scrapingService.getResults(productQuery, url);
    }
}
