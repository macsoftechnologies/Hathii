import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { chatDto } from './dto/chat.dto';
import { Chat } from './schema/chat.schema';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel:Model<Chat>) {}

    async createChat(req: chatDto) {
        try{
            const add = await this.chatModel.create(req);
            if(add) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Chat added Succesfully",
                    data: add,
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error,
            }
        }
    }

    async getChatList() {
        try{
            const list = await this.chatModel.find();
            if(list) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "List of Chat",
                    data: list,
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error,
            }
        }
    }

    async getbychatid(req: chatDto) {
        try{
            const getIt = await this.chatModel.findOne({chatId: req.chatId});
            if(getIt) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Chat details",
                    data: getIt,
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error,
            }
        }
    }

    async updatechat(req: chatDto) {
        try{
            const moderate = await this.chatModel.updateOne({chatId: req.chatId},{
                $set: {
                    to: req.to,
                    from: req.from,
                    date: req.date,
                    time: req.time,
                    message: req.message,
                }
            });
            if(moderate) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Updated Chat Successfully",
                    data: moderate,
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error,
            }
        }
    }

    async deletechat(req: chatDto) {
        try{
            const eliminate = await this.chatModel.deleteOne({chatId: req.chatId});
            if(eliminate) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Updated Chat Successfully",
                    data: eliminate,
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg: "Invalid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error,
            }
        }
    }
}
