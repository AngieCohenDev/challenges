import { Controller, Get, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Film } from './interface/films.interface';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all films with optional filters' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter by title' })
  @ApiQuery({
    name: 'director',
    required: false,
    description: 'Filter by director',
  })
  @ApiQuery({
    name: 'producer',
    required: false,
    description: 'Filter by producer',
  })
  @ApiQuery({
    name: 'release_date',
    required: false,
    description: 'Filter by release date (YYYY-MM-DD)',
  })
  async getFilms(
    @Query('title') title?: string,
    @Query('director') director?: string,
    @Query('producer') producer?: string,
    @Query('release_date') release_date?: string,
  ): Promise<Film[]> {
    const filters = { title, director, producer, release_date };
    return await this.filmsService.findAll(filters);
  }
}
