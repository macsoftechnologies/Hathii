import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { chatDto } from './dto/chat.dto';
import { requestDto } from './dto/request.dto';
import { Chat } from './schema/chat.schema';
import { Request } from './schema/request.schema';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel:Model<Chat>,@InjectModel(Request.name) private requestModel: Model<Request>) {}

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

    async addrequest(req: requestDto) {
        try{
            const add = await this.requestModel.create(req);
            if(add) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Request Added Successfully",
                    data: add,
                }
            } 
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg:"Invlid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                mzg: error,
            }
        }
    }

    async getrequestslist() {
        try{
            const bring = await this.requestModel.find();
            if(bring) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "List of requests",
                    data: bring,
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

    async getrequest(req: requestDto) {
        try{
            const getRequest = await this.requestModel.findOne({requestId: req.requestId});
            if(getRequest) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Request Details",
                    data: getRequest,
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                msg:"Invalid Request",
            }
        } catch(error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error,
            }
        }
    }

    async updaterequest(req: requestDto) {
        try{
            const moderate = await this.requestModel.updateOne({requestId: req.requestId},{
                $set: {
                    request: req.request,
                    providerId: req.providerId,
                    vendorId: req.vendorId
                }
            });
            if(moderate) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Updated Successfully",
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

    async deleterequest(req: requestDto) {
        try{
            const eliminate = await this.requestModel.deleteOne({requestId: req.requestId});
            if(eliminate) {
                return {
                    statusCode: HttpStatus.OK,
                    msg: "Deleted Successfully",
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
