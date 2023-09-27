import { CommonJwtAuthGuard } from '@scraping-app/libs/auth';
import { ScrapingService } from './scraping.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@scraping-app/nest-decorators';
import { UserEntity } from '@scraping-app/models';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ScrappingScrapping } from '@scraping-app/libs/contracts';

@Controller('scraping')
export class ScrapingController {
    constructor(private readonly scrapingService: ScrapingService){}

    @UseGuards(CommonJwtAuthGuard)
    @MessagePattern(ScrappingScrapping.topic)
    getProductsAsync(@Payload() {url, productQuery}: ScrappingScrapping.Request, @CurrentUser() {id}: UserEntity){
        return this.scrapingService.getProducts(productQuery, url, id);
    }
}
