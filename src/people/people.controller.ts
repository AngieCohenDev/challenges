import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { People } from './interface/people.interface';
import { ObjectId } from 'mongodb';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all people with optional filters' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by name' })
  async findAll(
    @Query('name') name?: string,
    @Query('id') _id?: ObjectId
    
  ): Promise<People[]> {
    return await this.peopleService.findAll({name, _id});
  }
}
