import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import AccountDto from './lib/account.dto';

global.dbData = [] as AccountDto[];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
