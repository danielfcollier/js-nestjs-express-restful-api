import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import Db from '../lib/Db';

@Controller('reset')
export class ResetController {
  @Post()
  async postReset(
    _,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      await Db.reset();
      return res.status(HttpStatus.OK).send('OK');
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('0');
    }
  }
}
