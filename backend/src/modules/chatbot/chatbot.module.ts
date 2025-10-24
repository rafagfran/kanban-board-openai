import { DatabaseModule } from '@/database/database.module';
import { CardModule } from '@/modules/card/card.module';
import { ColumnModule } from '@/modules/column/column.module';
import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [CardModule, ColumnModule, DatabaseModule],
  controllers: [ChatbotController],
  providers: [ChatbotService]
})
export class ChatbotModule { }
