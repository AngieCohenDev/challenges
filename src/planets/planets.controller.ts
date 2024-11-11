import { Controller, Get, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Planet } from './interface/planets.interface';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all planets with optional filters' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by name' })
  @ApiQuery({
    name: 'climate',
    required: false,
    description: 'Filter by climate',
  })
  @ApiQuery({
    name: 'terrain',
    required: false,
    description: 'Filter by terrain',
  })
  @ApiQuery({
    name: 'population',
    required: false,
    description: 'Filter by population',
  })
  findAll(
    @Query('name') name?: string,
    @Query('climate') climate?: string,
    @Query('terrain') terrain?: string,
    @Query('population') population?: string,
  ): Promise<Planet[]> {
    const filters: Partial<Planet> = {};
    if (name) filters.name = name;
    if (climate) filters.climate = climate;
    if (terrain) filters.terrain = terrain;
    if (population) filters.population = population;

    return this.planetsService.findAll(filters);
  }
}
