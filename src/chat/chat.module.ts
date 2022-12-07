import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, chatSchema } from './schema/chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Chat.name, schema: chatSchema}])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
