import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

class EventDto {
  origin: string;
}

@Controller('event')
export class EventController {
  @Post()
  postEvent(
    @Body() body: EventDto,
    @Res({ passthrough: true }) res: Response,
  ): Response {
    const { origin } = body;
    if (origin) {
      return res.status(HttpStatus.OK).send('OK');
    }

    return res.status(HttpStatus.BAD_REQUEST).send('0');
  }
}
