import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentRepo } from './content.repo';

@Module({
  controllers: [ContentController],
  providers: [ContentService, ContentRepo],
})
export class ContentModule {}
