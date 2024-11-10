import { Injectable, Logger } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { ApiEndPointsReference } from 'src/common/Api.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MongoRepository } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { PaginatedResponse } from './interface/starships.interface';

@Injectable()
export class StarshipsService {
  private readonly logger = new Logger(StarshipsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Starship)
    private readonly starshipRepository: MongoRepository<Starship>,
  ) {}

  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const newStarship = this.starshipRepository.create(createStarshipDto);
    return await this.starshipRepository.save(newStarship);
  }
  async findAll(filters?: Partial<Starship>): Promise<Starship[]> {
    const conditions: FindOptionsWhere<Starship> = {};

    if (filters) {
      if (filters.name) {
        conditions.name = {
          $regex: new RegExp(filters.name, 'i'),
        } as any as string;
      }
      if (filters.model) {
        conditions.model = {
          $regex: new RegExp(filters.model, 'i'),
        } as any as string;
      }
      if (filters.manufacturer) {
        conditions.manufacturer = {
          $regex: new RegExp(filters.manufacturer, 'i'),
        } as any as string;
      }
      if (filters.starship_class) {
        conditions.starship_class = {
          $regex: new RegExp(filters.starship_class, 'i'),
        } as any as string;
      }
    }

    return await this.starshipRepository.find({
      where: conditions,
    });
  }

  async findOne(id: string): Promise<Starship> {
    return await this.starshipRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateStarshipDto: UpdateStarshipDto,
  ): Promise<Starship> {
    await this.starshipRepository.update(id, updateStarshipDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.starshipRepository.delete(id);
    this.logger.log(`Starship with ID ${id} removed successfully.`);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async getStarshipsFromExternalApi(): Promise<void> {
    const apiUrl = `${this.configService.get<string>('API_HOST')}/${
      ApiEndPointsReference.STARSHIPS
    }`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<PaginatedResponse>(apiUrl),
      );

      const savedStarships = await this.saveStarships(response.data.results);
      const currentDate = new Date().toLocaleString();
      this.logger.log(`
          ====================== 🚀 Starship Update Report 🚀 ======================
          🟢 Status: SUCCESS
          📅 Date & Time: ${currentDate}
          🌠 Starships Created: ${savedStarships.length}
          
          ====================================================================
      `);
    } catch (error) {
      this.logger.error(`Failed to update starships data: ${error.message}`);
    }
  }

  private async saveStarships(
    starships: CreateStarshipDto[],
  ): Promise<Starship[]> {
    try {
      await this.starshipRepository.clear(); // Limpia los datos existentes

      const savedStarships: Starship[] = [];
      for (const starship of starships) {
        const savedStarship = await this.starshipRepository.save(starship);
        savedStarships.push(savedStarship);
      }

      this.logger.log(`Successfully saved ${savedStarships.length} starships.`);

      return savedStarships;
    } catch (error) {
      this.logger.error(`Error saving starships: ${error.message}`);
      throw error;
    }
  }
}
