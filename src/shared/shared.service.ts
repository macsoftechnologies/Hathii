import { Injectable } from '@nestjs/common';
var fs = require('fs');
import moment = require('moment');

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

@Injectable()
export class SharedService {
  async encryption(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedText: encrypted.toString('hex') };
  }

  async saveFile(file: any): Promise<any> {
    try {
      let fileName = file.originalname;
      console.log(file)
      fileName = fileName.replace(/\//g, '-');
      fileName = fileName.replace(/ /g, '_');
      fileName = fileName.replace(/[()]/g, '');

      const filePath = moment() + '-' + fileName;

      console.log(filePath);
      await fs.writeFileSync('./files/' + filePath, file.buffer, 'buffer');

      return filePath;
    } catch (err) {
      // An error occurred
      console.error(err);
    }
  }
}
