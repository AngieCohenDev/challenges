import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship]),
    HttpModule.register({
      timeout: 5000, // Tiempo máximo de espera para la respuesta en milisegundos
      maxRedirects: 5, // Número máximo de redirecciones permitidas
    }),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}
