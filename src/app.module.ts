import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { FilmModule } from './film/film.module';
import { BannerModule } from './banner/banner.module';
import { S3Module } from './s3/s3.module';
import { FilmMediaModule } from './film-media/film-media.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), MediaModule, FilmModule, BannerModule, S3Module, FilmMediaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
