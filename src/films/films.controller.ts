import { Controller, Get, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FilmsApiResponse } from './interface/films.interface';
import { ObjectId } from 'mongodb';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

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
    @Query('_id') _id?: ObjectId,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<FilmsApiResponse> {
    return await this.filmsService.findAll(page, limit, { title, director, producer, release_date, _id });
  }
}
