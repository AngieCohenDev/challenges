import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiEndPointsReference } from '../common/Api.enum';
import { ConfigService } from '@nestjs/config';
import { People as Person } from './entities/person.entity';
import { PaginatedResponse, People } from './interface/people.interface';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {
    this.getPeopleFromExternalApi()
  }

  async create(createPeopleDto: People[]): Promise<People[]> {
    await this.personRepository.clear();
    const createPeople = this.personRepository.create(createPeopleDto);
    const savedPeople = await this.personRepository.save(createPeople);

    const currentDate = new Date().toLocaleString();
    this.logger.log(`
    ====================== 🧑 Person Update Report 🧑 ======================
    🟢 Status: SUCCESS
    📅 Date & Time: ${currentDate}
    👥 People Created: ${savedPeople.length}
    =======================================================================
    `);
    return savedPeople;
  }

  async findAll(filters?: Partial<People>): Promise<People[]> {
    const conditions: FindOptionsWhere<People> = {};

    if (filters) {
      if (filters.name) {
        conditions.name = {
          $regex: new RegExp(filters.name, 'i'),
        } as any as string;
      }
    }

    return await this.personRepository.find({
      where: conditions,
    });
  }

  @Cron('0 0 */2 * *')
  async getPeopleFromExternalApi(): Promise<void> {
    const apiUrl = `${this.configService.get<string>('API_HOST')}/${
      ApiEndPointsReference.PEOPLE 
    }`;
  
    let nextUrl = apiUrl;
    const allPeople: any[] = [];
  
    try {
      while (nextUrl) {
        const response = await firstValueFrom(
          this.httpService.get<PaginatedResponse>(nextUrl),
        );
  
        const { results, next } = response.data;
        allPeople.push(...results);
        nextUrl = next; 
      }
  
      await this.create(allPeople);
      new Date().toLocaleString();
  

    } catch (error) {
      this.logger.error('Failed to fetch and save people data', error.message);
    }
  }
  

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<void> {
    await this.personRepository.update(id, updatePersonDto);
    this.logger.log(`🛠️ Person #${id} updated successfully`);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
    this.logger.log(`🗑️ Person #${id} removed successfully`);
  }
}
