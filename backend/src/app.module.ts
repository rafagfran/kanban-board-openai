import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CardModule } from './modules/card/card.module';

import { AllExceptionsFilter } from './common/filters/allExceptionsFilter';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { ColumnModule } from './modules/column/column.module';

@Module({
  imports: [CardModule, DatabaseModule, ColumnModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService, AllExceptionsFilter]
})
export class AppModule { }
