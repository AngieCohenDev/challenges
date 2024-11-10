import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([People]),
    HttpModule.register({
      timeout: 5000, // Tiempo máximo de espera para la respuesta en milisegundos
      maxRedirects: 5, // Número máximo de redirecciones permitidas
    }),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
