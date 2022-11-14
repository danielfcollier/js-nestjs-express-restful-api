import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import Db from '../lib/Db';

@Controller('reset')
export class ResetController {
  @Post()
  postReset(_, @Res({ passthrough: true }) res: Response): void {
    try {
      Db.reset();
      res.status(HttpStatus.OK).send('OK');
    } catch {
      res.status(HttpStatus.NOT_FOUND).send('0');
    }
  }
}
