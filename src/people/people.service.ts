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
  ) {}

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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getPeopleFromExternalApi(): Promise<void> {
    const apiUrl = `${this.configService.get<string>('API_HOST')}/${
      ApiEndPointsReference.PEOPLE
    }`;
    const response = await firstValueFrom(
      this.httpService.get<PaginatedResponse>(apiUrl),
    );

    const savedPeople = await this.create([...response.data.results]);
    const currentDate = new Date().toLocaleString();
    this.logger.log(`
        ====================== 👤 People Update Report 👤 ======================
        🟢 Status: SUCCESS
        📅 Date & Time: ${currentDate}
        👥 People Created: ${savedPeople.length}
        
        ====================================================================
    `);
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
