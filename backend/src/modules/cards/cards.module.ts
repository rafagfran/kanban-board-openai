import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [DatabaseModule],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [CardsService]
})
export class CardsModule { }
