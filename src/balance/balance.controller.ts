import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('balance')
export class BalanceController {
  @Get()
  getBalance(
    @Query() query: { account_id: string },
    @Res({ passthrough: true }) res: Response,
  ): Response {
    const { account_id } = query;
    if (account_id) {
      return res.status(HttpStatus.OK).send('OK');
    }

    return res.status(HttpStatus.BAD_REQUEST).send('0');
  }
}
