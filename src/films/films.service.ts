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
import { FilmsApiResponse } from './interface/films.interface';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

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
  async findAll(filters?: Partial<Film>): Promise<Film[]> {
    const conditions: FindOptionsWhere<Film> = {};

    if (filters) {
      if (filters.title) {
        conditions.title = { $regex: new RegExp(filters.title, 'i') } as any; // Búsqueda parcial sin distinción de mayúsculas
      }
      if (filters.director) {
        conditions.director = {
          $regex: new RegExp(filters.director, 'i'),
        } as any;
      }
    }

    return await this.filmRepository.find({
      where: conditions,
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getFilmsFromExternalApi(): Promise<FilmsApiResponse> {
    const response = await firstValueFrom(
      this.httpService.get<FilmsApiResponse>(
        `${this.configService.get<string>('API_HOST')}/${
          ApiEndPointsReference.FILMS
        }`,
      ),
    );
    await this.create(response.data.results);
    return response.data;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
