import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import Db from '../lib/Db';

@Controller('balance')
export class BalanceController {
  @Get()
  getBalance(
    @Query() query: { account_id: string },
    @Res({ passthrough: true }) res: Response,
  ): void {
    const { account_id } = query;
    const data = Db.read(account_id);
    if (data) {
      res.status(HttpStatus.OK).json(data.balance);
      res.status(200);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('0');
    }
  }
}
