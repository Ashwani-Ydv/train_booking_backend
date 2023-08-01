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
      host: 'dpg-cj4jt4s07spu5oeeab8g-a',
      port: 5432,
      username: 'ashwani',
      password: 'JqhtgtCvw81eZtCBfrzUMTkeEybfSGtl',
      database: 'unstop_postgres',
      entities: [Seat],
      synchronize: true,
      ssl: true,
    }),
    SeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
