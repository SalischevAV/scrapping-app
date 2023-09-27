import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer-core';
import { ProductCard } from '@scraping-app/interfaces';

@Injectable()
export class ScrapingService {
    private readonly logger = new Logger(ScrapingService.name);
    constructor(private readonly configService: ConfigService){}

    async getProducts(productQuery: string, url = 'https://amazon.com', userId: number): Promise<ProductCard[]> {
       const browser = await puppeteer.connect({
            browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT')
       });
       try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2*60*1000);
        await Promise.all([
            page.waitForNavigation(),
            page.goto(url),
        ]);
        await page.type('#twotabsearchtextbox', productQuery);
        await Promise.all([
            page.waitForNavigation(),
            page.click('#nav-search-submit-button'),
        ]);
        const result = await page.$$eval(
            '.s-search-results .s-card-container',
            (resultItems) => {
              return resultItems.map((resultItem) => {
                const url = resultItem.querySelector('a').href;
                const title = resultItem.querySelector(
                  '.s-title-instructions-style span',
                )?.textContent;
                const price = resultItem.querySelector(
                  '.a-price .a-offscreen',
                ).textContent;
                const image = (resultItem.querySelector(
                    'img.s-image'
                ) as HTMLImageElement ).src;
                return {
                  url,
                  title,
                  price,
                  image,
                } as unknown as ProductCard;
              });
            },
          );
          this.saveResult(userId);
          return result;
       } catch (error) {
        this.logger.error(error);
        throw new NotFoundException(error);
       }finally {
        await browser.close();
       }
    }
    saveResult(userId: number) {
      this.logger.log(userId)
    }

    getResults(productQuery: string, url: string) {
        throw new Error('Method not implemented.');
    }
}
