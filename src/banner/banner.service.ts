import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ContentService } from 'src/content/content.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { Stream } from 'stream';
import { v4 } from 'uuid';

@Injectable()
export class BannerService {
    constructor(
        private readonly s3Service:S3Service,
        private readonly prismaService:PrismaService,
        private readonly contentService:ContentService      
    ){}

    async uploadBanner(url:string, file:Express.Multer.File, bucker:string){
        const key = v4()
        const content = await this.prismaService.content.findFirst({
            where: {
                url
            }
        })
        if(!content){
            throw new BadRequestException()
        }

        if(content.banner){
            await this.deleteBanner(bucker, url)
        }

        const _key = await this.s3Service.upload(file, bucker, "banner/" + key)
        const resUpload = _key.key.substring(7)
        return this.prismaService.content.update({
            where: {
                url
            },
            data: {
                banner: resUpload
            }
        })
    }
    
    async deleteBanner(bucker:string, url:string){
        const content = await this.contentService.getContentByUrl(url)
        if(!content){
            throw new BadRequestException()
        }
        
        await this.s3Service.deleteFile(bucker, "banner/" + content.banner)
        
        return this.prismaService.content.update({
            where: {
                id: content.id
            },
            data: {
                banner: null
            }
        })
    }

    async getBannerFile(bucker:string, key: string, res:Response){
        const file = await this.s3Service.getFile(bucker, "banner/" + key);
    
        // Устанавливаем заголовки для файла
        res.set({
          'Content-Type': file.ContentType,
          'Content-Length': file.ContentLength,
        });
        // Передаем поток данных в response
        (file.Body as Stream).pipe(res);
    }
}
