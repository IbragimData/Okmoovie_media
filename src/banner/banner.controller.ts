import { Controller, Get, Param, Res } from '@nestjs/common';
import { BannerService } from './banner.service';
import { Response } from 'express';

@Controller('banner')
export class BannerController {
    constructor(
        private readonly bannerService:BannerService
    ){}

    @Get(":key")
    async getBannerFile(@Param("key") key:string, @Res() res:Response){
        const bucketName = 'account-910';
        return await this.bannerService.getBannerFile(bucketName, key, res)
    }

}