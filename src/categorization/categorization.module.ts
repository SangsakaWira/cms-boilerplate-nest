import { Module } from '@nestjs/common';
import { CategorizationController } from './categorization.controller';
import { CategorizationService } from './categorization.service';
import { CategorizationRepo } from './categorization.repo';

@Module({
  controllers: [CategorizationController],
  providers: [CategorizationService, CategorizationRepo],
})
export class CategorizationModule {}
