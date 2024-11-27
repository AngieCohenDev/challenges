import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiEndPointsReference } from '../common/Api.enum';
import { ConfigService } from '@nestjs/config';
import { Film } from './entities/film.entity';
import { FilmI, FilmsApiResponse } from './interface/films.interface';
import { log } from 'console';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {
    this.getFilmsFromExternalApi();
  }

  async create(createFilmDto: CreateFilmDto[]): Promise<Film[]> {
    await this.filmRepository.clear();
    const savedFilm = await this.filmRepository.save(createFilmDto);

    const currentDate = new Date().toLocaleString();
    this.logger.log(`
    ====================== 🎬 Film Update Report 🎬 ======================
    🟢 Status: SUCCESS
    📅 Date & Time: ${currentDate}
    🎞️ Films Created: ${savedFilm.length}
    
    ====================================================================
    `);
    return savedFilm;
  }

  async findAll(
    page : number = 1, 
    limit : number = 10, 
    {...filters }: Partial<FilmI>
  ): Promise<FilmsApiResponse> {
    const conditions: FindOptionsWhere<Film> = {};

    if (filters) {
      if (filters.title) {
        conditions.title = { $regex: new RegExp(filters.title, 'i') } as any; // Búsqueda parcial sin distinción de mayúsculas
      }
      if (filters.director) {
        conditions.director = { $regex: new RegExp(filters.director, 'i') } as any;
      }
    }

    const [results, total] = await this.filmRepository.findAndCount({
      where: conditions,
      take: limit, // Límite de elementos por página
      skip: (page - 1) * limit, // Desplazamiento para obtener los resultados de la página actual
    });

    return {
      total,
      page,
      limit,
      results,
    };
  }


  @Cron('0 0 */2 * *')
  async getFilmsFromExternalApi(): Promise<FilmsApiResponse> {
    const response = await firstValueFrom(
      this.httpService.get<FilmsApiResponse>(
        `${this.configService.get<string>('API_HOST')}/${ApiEndPointsReference.FILMS
        }`,
      ),
    );

    await this.create(response.data.results);
    return response.data;
  }
}
