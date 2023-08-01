// seats.controller.ts
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { SeatsService } from './seat.service';
import { Seat } from './entities/seat.entity';

@Controller('seats')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  @Get()
  async findAll(): Promise<Seat[]> {
    return await this.seatsService.findAll();
  }

  @Post('/book/:numSeats')
  async bookSeats(@Param('numSeats') numSeats: number): Promise<Seat[]> {
    try {
      return await this.seatsService.bookSeats(numSeats);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @Post('/create')
  async createSeats(@Body() seats: Seat[]): Promise<Seat[]> {
    return await this.seatsService.createSeats(seats);
  }

  @Delete('')
  async deleteAll(): Promise<void> {
    return await this.seatsService.deleteAll();
  }
}
