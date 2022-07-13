import { Injectable } from '@nestjs/common';
var fs = require('fs');
import moment = require('moment');
@Injectable()
export class SharedService {
    async saveFile(file: any): Promise<any> {
        try {
          let fileName = file.originalname;
          fileName = fileName.replace(/\//g, '-');
          fileName = fileName.replace(/ /g, '_');
          fileName = fileName.replace(/[()]/g, '');
    
          const filePath =   moment() + '-' + fileName;
    
          console.log(filePath);
          await fs.writeFileSync('./files/' + filePath, file.buffer, 'buffer');
    
          return filePath;
        } catch (err) {
          // An error occurred
          console.error(err);
        }
      }
}
