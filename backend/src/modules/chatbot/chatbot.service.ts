import { Injectable } from '@nestjs/common';
import { MessageContextService } from '../openai/services/messageContext.service';
import { OpenAIService } from '../openai/services/openai.service';
import { ToolsService } from '../openai/services/tools.service';
import { CreateMessageDto } from './dto/create-message.dto';


@Injectable()
export class ChatbotService {
  constructor(
    private openAI: OpenAIService,
    private toolsService: ToolsService,
    private messageContext: MessageContextService
  ) { }

  /**
   * Recebe uma mensagem do usuário e processa usando o modelo.
   * Executa as ferramentas necessárias e atualiza o contexto de mensagens.
   * @param createMessageDto Objeto contendo a mensagem do usuário.
   * @returns Resultado da mensagem processada, incluindo toolCalls e resposta do modelo.
   */
  async handleMessage(createMessageDto: CreateMessageDto) {
    const { message } = createMessageDto;
    const response = await this.openAI.generateText(
      this.messageContext.getMessages(),
      this.toolsService.getTools()
    );
    this.messageContext.addUserMessage(message);
    if (response.toolCalls.length > 0) {
      this.messageContext.addToolMessage(response.toolResults);
    } else {
      this.messageContext.addAssistantMessage(response.text);
    }
    return { toolCalls: response.toolCalls, message: response.text };
  }
}
