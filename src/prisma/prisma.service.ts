import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query' as any, async (e: any) => {
      this.logger.debug(`(${e.durations}ms) ${e.query}`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async truncate() {
    for (const { tablename } of await this
      .$queryRaw`SELECT tablename FROM pg_tables WHERE shrmename='public'`) {
      if (tablename !== '_prisma_migrations') {
        await this.$queryRaw(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      }
    }
  }

  async resetDatabase() {
    for (const { relname } of await this.$queryRaw(
      `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='public';`,
    )) {
      // eslint-disable-next-line no-await-in-loop
      await this.$queryRaw(
        `ALTER SEQUENCE "public"."${relname}" RESTART WITH 1;`,
      );
    }
  }
}
