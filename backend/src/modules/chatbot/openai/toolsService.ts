import { CardService } from '@/modules/card/card.service';
import { CreateCardDto } from '@/modules/card/dto/create-card.dto';
import { ColumnService } from '@/modules/column/column.service';
import { Injectable } from '@nestjs/common';
import { CardPriority } from '@prisma/client';
import { ToolSet, tool } from 'ai';
import { z } from 'zod';

@Injectable()
export class ToolsService {
  tools: ToolSet;

  constructor(
    private cardService: CardService,
    private columnService: ColumnService
  ) {
    this.initializeTools();
  }

  /**
 * Configura ferramentas (tools) para interação do modelo.
 * Cada ferramenta representa uma ação no sistema, como criar coluna, criar card ou deletar.
 */
  private initializeTools() {
    this.tools = {
      getInfos: tool({
        description: 'Get columns and cards informations',
        parameters: z.object({}),
        execute: async () => await this.columnService.listWithCards(),
      }),
      createCol: tool({
        description: 'Create a single new column',
        parameters: z.object({ title: z.string().describe('Column title') }),
        execute: async ({ title }) => await this.columnService.create({ title }),
      }),
      createMultipleCols: tool({
        description: 'Create multiple columns',
        parameters: z.object({
          columns: z.array(z.object({ title: z.string().describe('Column title') })),
        }),
        execute: async ({ columns }) => await this.columnService.createMany(columns),
      }),
      createCard: tool({
        description: 'Create a single new card',
        parameters: z.object({
          title: z.string().describe('Card title'),
          priority: z.nativeEnum(CardPriority).describe('Card Priority'),
          columnId: z.number().describe('Column ID')
        }),
        execute: async ({ columnId, priority, title }) => {
          await this.cardService.create({ columnId, title, priority });
        },
      }),
      createMultipleCards: tool({
        description: 'Create multiple cards',
        parameters: z.object({
          cards: z.array(
            z.object({
              title: z.string(),
              priority: z.nativeEnum(CardPriority),
              columnId: z.number(),
            })
          )
        }),
        execute: async ({ cards }: { cards: CreateCardDto[] }) => {
          if (!Array.isArray(cards)) return 'Cards are not in correct format.';
          return await this.cardService.createMany(cards);
        },
      }),
      deleteAllColumns: tool({
        description: 'Delete all columns',
        parameters: z.object({}),
        execute: async () => await this.columnService.deleteAll(),
      }),
    };
  }

  getTools(): ToolSet {
    return this.tools;
  }
}
