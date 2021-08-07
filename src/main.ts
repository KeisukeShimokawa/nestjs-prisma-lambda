import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * NestJS の enableShutdownHooks に干渉して
   * Prisma はシャットダウン信号を Listen して
   * アプリが終了する前に pprocess.exit() を呼ぶ
   *
   * このためには Prisma の bedoreExit() イベント
   * のリスナーを追加する必要がある
   */
  const prismaService: PrismaService = app.get(PrismaService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
