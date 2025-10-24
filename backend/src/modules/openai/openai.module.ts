// src/openai/openai.module.ts
import { Module } from '@nestjs/common';
import { CardsModule } from '../cards/cards.module';
import { ColumnsModule } from '../columns/columns.module';
import { MessageContextService } from './messageContext.service';
import { OpenAIService } from './openai.service';
import { ToolsService } from './toolsService';


@Module({
  imports: [ColumnsModule, CardsModule],
  providers: [
    OpenAIService,
    ToolsService,
    MessageContextService,
  ],
  exports: [
    OpenAIService,
    ToolsService,
    MessageContextService,
  ],
})
export class OpenAIModule { }
