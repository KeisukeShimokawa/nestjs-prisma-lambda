import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [PrismaModule, SampleModule],
})
export class AppModule {}
