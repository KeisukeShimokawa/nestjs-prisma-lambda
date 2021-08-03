import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Sample as SampleModel } from '@prisma/client';
import { SampleService } from './sample.service';

@Controller()
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('/sample/:id')
  async getSample(@Param('id') id: string): Promise<SampleModel> {
    return this.sampleService.sample({
      id: id,
    });
  }

  @Post('/sample/:id')
  async createSample(
    @Body() postSampleData: { id: string; required: boolean; count: number },
  ): Promise<SampleModel> {
    return this.sampleService.createSample({
      id: postSampleData.id,
      required: postSampleData.required,
      count: postSampleData.count,
    });
  }
}
