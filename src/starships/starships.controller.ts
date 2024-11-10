import { Controller, Get, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Starship } from './entities/starship.entity';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all starships with optional filters' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by starship name',
  })
  @ApiQuery({ name: 'model', required: false, description: 'Filter by model' })
  @ApiQuery({
    name: 'manufacturer',
    required: false,
    description: 'Filter by manufacturer',
  })
  @ApiQuery({
    name: 'starship_class',
    required: false,
    description: 'Filter by starship class',
  })
  findAll(
    @Query('name') name?: string,
    @Query('model') model?: string,
    @Query('manufacturer') manufacturer?: string,
    @Query('starship_class') starship_class?: string,
  ): Promise<Starship[]> {
    const filters: Partial<Starship> = {};
    if (name) filters.name = name;
    if (model) filters.model = model;
    if (manufacturer) filters.manufacturer = manufacturer;
    if (starship_class) filters.starship_class = starship_class;

    return this.starshipsService.findAll(filters);
  }
}
