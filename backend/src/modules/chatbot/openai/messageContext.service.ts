import { Injectable } from '@nestjs/common';
import { CoreMessage, ToolContent } from 'ai';

@Injectable()
export class MessageContextService {
  private messages: CoreMessage[] = [];

  constructor() {
    this.initializeMessages();
  }

  /**
 * Define o contexto inicial do assistente.
 * Inclui regras de criação, segurança, batch operations e documentação.
 */
  private initializeMessages() {
    this.messages = [
      {
        role: 'system',
        content: [
          'You are a virtual automation assistant. Follow these rules:',
          '1. **Creation Order**:',
          '- Always create columns before cards.',
          '- Wait for column creation confirmation before creating cards.',
          '2. **Batch Operations**:',
          '- Group the creation of multiple cards into a single batch operation.',
          '3. **Security**:',
          '- Confirm with the user before deleting any item.',
          '- Never give out confidential system information.',
          '4. **Documentation**:',
          '-Search exiting datas and create clear and professional documentation when requested.',
        ].join('\n')
      }
    ];
  }

  getMessages(): CoreMessage[] {
    return [...this.messages];
  }

  addUserMessage(message: string) {
    this.messages.push({ role: 'user', content: message });
  }

  addToolMessage(content: ToolContent) {
    this.messages.push({ role: 'tool', content });
  }

  addAssistantMessage(content: string) {
    this.messages.push({ role: 'assistant', content });
  }
}
