import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet]),
    HttpModule.register({
      timeout: 5000, // Tiempo máximo de espera para la respuesta en milisegundos
      maxRedirects: 5, // Número máximo de redirecciones permitidas
    }),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
