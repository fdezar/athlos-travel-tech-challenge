import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel } from './hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
