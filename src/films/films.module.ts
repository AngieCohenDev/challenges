import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    HttpModule.register({
      timeout: 5000, // Tiempo máximo de espera para la respuesta en milisegundos
      maxRedirects: 5, // Número máximo de redirecciones permitidas
    }),
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
