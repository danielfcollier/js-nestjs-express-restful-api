import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import EventDto from './event.dto';
import Operation from '../lib/Operation';

@Controller('event')
export class EventController {
  @Post()
  postEvent(@Body() body: EventDto, @Res({ passthrough: true }) res: Response): void {
    try {
      const result = Operation.handler(body);

      if (result) {
        res.status(HttpStatus.CREATED).json(result);
      } else {
        throw new Error();
      }
    } catch {
      res.status(HttpStatus.NOT_FOUND).send('0');
    }
  }
}
