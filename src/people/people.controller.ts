import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { People } from './interface/people.interface';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all people with optional filters' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by name' })
  findAll(@Query('name') name?: string): Promise<People[]> {
    const filters: Partial<People> = {};
    if (name) {
      filters.name = name;
    }
    return this.peopleService.findAll(filters);
  }
}
