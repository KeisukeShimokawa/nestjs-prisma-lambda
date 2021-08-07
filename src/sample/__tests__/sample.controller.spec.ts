import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, Sample as SampleModel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SampleController } from '../sample.controller';
import { SampleService } from '../sample.service';
import { resetDatabase } from '../../utils/prisma';

const client = new PrismaClient();

describe('AppController', () => {
  let sampleController: SampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [SampleService, PrismaService],
    }).compile();

    sampleController = app.get<SampleController>(SampleController);

    await resetDatabase();
  });

  afterAll(async () => {
    await client.$disconnect();
  });

  describe('ENDPOINT /sample/:id', () => {
    it('IDが1のサンプルデータを作成する"', async () => {
      // Arrange
      await client.sample.create({
        data: {
          id: '1',
          required: true,
          count: 10,
        },
      });

      // Act
      const actual: SampleModel = await sampleController.getSample('1');

      // Assert
      expect(actual.id).toBe('1');
      expect(actual.required).toBeTruthy();
      expect(actual.count).toBe(10);
    });

    it('IDが1のサンプルデータを取得する', async () => {
      // Act
      const actual: SampleModel = await sampleController.createSample({
        id: '2',
        required: false,
        count: 100,
      });

      // Assert
      expect(actual.id).toBe('2');
      expect(actual.required).toBeFalsy();
      expect(actual.count).toBe(100);
    });
  });
});
