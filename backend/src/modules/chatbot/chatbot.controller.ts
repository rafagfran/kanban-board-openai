import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) { }

  @Post()
  chatbot(@Body() createMessageDto: CreateMessageDto) {
    return this.chatbotService.handleMessage(createMessageDto);
  }
}
