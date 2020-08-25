import { Injectable } from '@nestjs/common';
import { Message } from '@blitz-basic-script/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to BlitzBasicScript!' };
  }
}
