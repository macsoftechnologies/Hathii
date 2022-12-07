import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { chatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiTags('chat')
  @ApiBody({
    type: chatDto
  })
  @Post('/addChat')
  async addChat(@Body() req: chatDto) {
    try{
      const add = await this.chatService.createChat(req);
      return add;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('chat')
  @Get('/getChat')
  async getChat() {
    try{
      const add = await this.chatService.getChatList();
      return add;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('chat')
  @ApiBody({
    type: chatDto
  })
  @Post('getByChatId')
  async getByChatId(@Body() req: chatDto) {
    try{
      const getOne = await this.chatService.getbychatid(req);
      return getOne;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('chat')
  @ApiBody({
    type: chatDto
  })
  @Post('updateChat')
  async updateChat(@Body() req: chatDto) {
    try{
      const moderate = await this.chatService.updatechat(req);
      return moderate;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }

  @ApiTags('chat')
  @ApiBody({
    type: chatDto
  })
  @Post('deleteChat')
  async deleteChat(@Body() req: chatDto) {
    try{
      const eliminate = await this.chatService.deletechat(req);
      return eliminate;
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error,
      }
    }
  }
}
