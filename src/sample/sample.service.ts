import { Injectable } from '@nestjs/common';
import { Prisma, Sample } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SampleService {
  constructor(private prisma: PrismaService) {}

  async sample(
    sampleWhereUniqueInput: Prisma.SampleWhereUniqueInput,
  ): Promise<Sample | null> {
    return this.prisma.sample.findUnique({
      where: sampleWhereUniqueInput,
    });
  }

  async createSample(data: Prisma.SampleCreateInput): Promise<Sample> {
    return this.prisma.sample.create({
      data,
    });
  }
}
