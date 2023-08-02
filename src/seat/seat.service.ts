// seats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatsRepository: Repository<Seat>,
  ) {}

  seat = [];

  findAll(): Promise<Seat[]> {
    return this.seatsRepository.find();
  }

  async createSeats(seats: Seat[]): Promise<Seat[]> {
    console.log(seats);
    return this.seatsRepository.save(seats);
  }

  async bookSeats(numSeats: number): Promise<Seat[]> {
    try {
      if (numSeats > 7) {
        throw new Error('Cannot book more than 7 seats at a time');
      }

      const availableSeats = await this.seatsRepository.findBy({
        status: 'available',
      });

      if (availableSeats.length < numSeats) {
        throw new Error('Not enough seats available');
      }

      const seatsByRow = this.groupSeatsByRow(availableSeats);

      for (const row of Object.keys(seatsByRow)) {
        if (seatsByRow[row].length >= numSeats) {
          return this.bookSeatsInRow(seatsByRow[row], numSeats);
        }
      }

      return this.bookClosestSeats(availableSeats, numSeats);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private groupSeatsByRow(seats: Seat[]): Record<string, Seat[]> {
    return seats.reduce((groups, seat) => {
      if (!groups[seat.row]) {
        groups[seat.row] = [];
      }
      groups[seat.row].push(seat);
      return groups;
    }, {});
  }

  private async bookSeatsInRow(
    seats: Seat[],
    numSeats: number,
  ): Promise<Seat[]> {
    const seatsToBook = seats.slice(0, numSeats);
    for (const seat of seatsToBook) {
      seat.status = 'booked';
    }
    await this.seatsRepository.save(seatsToBook);
    return seatsToBook;
  }

  private async bookClosestSeats(
    seats: Seat[],
    numSeats: number,
  ): Promise<Seat[]> {
    const sortedSeats = seats.sort((a, b) => a.row - b.row || a.seat - b.seat);
    return this.bookSeatsInRow(sortedSeats, numSeats);
  }

  async updateAll(): Promise<void> {
    await this.seatsRepository.update(
      {},{status:"available"});
  }
}
