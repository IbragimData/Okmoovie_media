import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { ContentService } from 'src/content/content.service';
import { BannerController } from './banner.controller';

@Module({
  providers: [BannerService, PrismaService, S3Service, ContentService],
  controllers: [BannerController]
})
export class BannerModule {}
