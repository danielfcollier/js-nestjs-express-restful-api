import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResetController } from './reset/reset.controller';
import { BalanceController } from './balance/balance.controller';
import { EventController } from './event/event.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ResetController,
    BalanceController,
    EventController,
  ],
  providers: [AppService],
})
export class AppModule {}
