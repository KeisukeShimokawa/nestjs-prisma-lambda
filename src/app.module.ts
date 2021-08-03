import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  imports: [],
  controllers: [SampleController],
  providers: [SampleService, PrismaService],
})
export class AppModule {}
