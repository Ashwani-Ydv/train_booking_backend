// seats.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seat.service';
import { SeatsController } from './seat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  providers: [SeatsService],
  controllers: [SeatsController],
})
export class SeatsModule {}
