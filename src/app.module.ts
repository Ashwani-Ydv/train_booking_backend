import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatsModule } from './seat/seat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat/entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cj4b3mqip7vuask818ag-a',
      port: 5432,
      username: 'admin',
      password: 'L0O8OHAJ4SvvEtpqxDJ2hlJqsN852w1D',
      database: 'admin_ugpf',
      entities: [Seat],
      synchronize: true,
    }),
    SeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
