import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeasonService } from 'src/season/season.service';
import { ContentService } from 'src/content/content.service';

@Module({
  providers: [EpisodeService, PrismaService, SeasonService, ContentService],
  controllers: []
})
export class EpisodeModule {}
