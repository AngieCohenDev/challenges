import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { ApiEndPointsReference } from '../common/Api.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MongoRepository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { PaginatedResponse } from './interface/planets.interface';

@Injectable()
export class PlanetsService {
  private readonly logger = new Logger(PlanetsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Planet)
    private readonly planetRepository: MongoRepository<Planet>,
  ) {}

  async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    const newPlanet = this.planetRepository.create(createPlanetDto);
    return await this.planetRepository.save(newPlanet);
  }

  async findAll(filters?: Partial<Planet>): Promise<Planet[]> {
    const conditions: FindOptionsWhere<Planet> = {};

    if (filters) {
      if (filters.name) {
        conditions.name = {
          $regex: new RegExp(filters.name, 'i'),
        } as any as string;
      }
      if (filters.climate) {
        conditions.climate = {
          $regex: new RegExp(filters.climate, 'i'),
        } as any as string;
      }
      if (filters.terrain) {
        conditions.terrain = {
          $regex: new RegExp(filters.terrain, 'i'),
        } as any as string;
      }
      if (filters.population) {
        conditions.population = filters.population;
      }
    }

    return await this.planetRepository.find({
      where: conditions,
    });
  }
  async findOne(id: string): Promise<Planet> {
    return await this.planetRepository.findOneBy({ id });
  }

  async update(id: string, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    await this.planetRepository.update(id, updatePlanetDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.planetRepository.delete(id);
    this.logger.log(`Planet with ID ${id} removed successfully.`);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getPlanetsFromExternalApi(): Promise<void> {
    const apiUrl = `${this.configService.get<string>('API_HOST')}/${
      ApiEndPointsReference.PLANETS
    }`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<PaginatedResponse>(apiUrl),
      );

      const savedPlanets = await this.savePlanets(response.data.results);
      const currentDate = new Date().toLocaleString();
      this.logger.log(`
          ====================== 🌍 Planet Update Report 🌍 ======================
          🟢 Status: SUCCESS
          📅 Date & Time: ${currentDate}
          🌌 Planets Created: ${savedPlanets.length}
          
          ====================================================================
      `);
    } catch (error) {
      this.logger.error(`Failed to update planets data: ${error.message}`);
    }
  }

  private async savePlanets(planets: CreatePlanetDto[]): Promise<Planet[]> {
    try {
      await this.planetRepository.clear(); // Limpia los datos existentes

      const savedPlanets: Planet[] = [];
      for (const planet of planets) {
        const savedPlanet = await this.planetRepository.save(planet);
        savedPlanets.push(savedPlanet);
      }

      this.logger.log(`Successfully saved ${savedPlanets.length} planets.`);
      return savedPlanets;
    } catch (error) {
      this.logger.error(`Error saving planets: ${error.message}`);
      throw error;
    }
  }
}
