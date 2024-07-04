import { Module } from '@nestjs/common';
import { InstanceService } from './instance.service';
import { InstanceController } from './instance.controller';
import { PrismaModule } from 'src/db/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [InstanceController],
  providers: [InstanceService],
})
export class InstanceModule {}
