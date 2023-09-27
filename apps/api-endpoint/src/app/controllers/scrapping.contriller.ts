import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CommonJwtAuthGuard } from "@scraping-app/libs/auth";
import { ScrappingScrapping } from "@scraping-app/libs/contracts";
import { UserEntity } from "@scraping-app/models";
import { CurrentUser } from "@scraping-app/nest-decorators";
import { firstValueFrom } from "rxjs";

@Controller('scrapping')
export class ScrappingController {
    constructor(
        @Inject(ScrappingScrapping.injectionToken) private readonly scrappingService: ClientProxy,
    ) { }

    @UseGuards(CommonJwtAuthGuard)
    @Get('scrapping')
    async scrappingRequest(@Query('productQuery') productQuery, @Query('url') url,  @CurrentUser() currentUser: UserEntity) {
        return await firstValueFrom(
            this.scrappingService.send<ScrappingScrapping.Response, ScrappingScrapping.Request>(
                ScrappingScrapping.topic,
                { productQuery, url, Authorization: currentUser.accessToken }
            )
        )
    }
}
