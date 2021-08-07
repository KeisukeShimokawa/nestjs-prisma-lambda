// import { prisma } from '@test/prisma';
import { prisma } from './prisma';

export const seedSampleData = async (params: {
  id: string;
  required?: boolean;
  count?: number;
}) => {
  const { id, required, count } = params;
  const sampleData = {
    id,
    required: required ?? true,
    count: count ?? 10,
  };

  await prisma.sample.create({
    data: sampleData,
  });
};
