import { Injectable } from '@nestjs/common';
import { Instance, Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class InstanceService {
  constructor(private prisma: PrismaService) {}

  async getOneInstance(
    where: Prisma.InstanceWhereUniqueInput,
  ): Promise<Instance | null> {
    const res = await this.prisma.instance.findUnique({
      where,
    });

    return res;
  }

  async getInstances(): Promise<Instance[]> {
    const res = await this.prisma.instance.findMany();

    return res;
  }

  async createInstance(data: Prisma.InstanceCreateInput): Promise<Instance> {
    return this.prisma.instance.create({
      data,
    });
  }

  async deleteInstance(
    where: Prisma.InstanceWhereUniqueInput,
  ): Promise<Instance> {
    return this.prisma.instance.delete({
      where,
    });
  }
}
