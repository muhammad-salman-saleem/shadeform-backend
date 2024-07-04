import { Module, HttpStatus } from '@nestjs/common';
import { InstanceModule } from './instances/instance.module';

@Module({
  imports: [InstanceModule],
  controllers: [],
})
export class AppModule {}
