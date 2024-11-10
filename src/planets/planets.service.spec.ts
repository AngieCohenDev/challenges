import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('PlanetsService - findAll', () => {
  let service: PlanetsService;
  let planetRepository: MongoRepository<Planet>;

  const mockPlanets: Planet[] = [
    {
      id: '1',
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [],
      films: [],
      created: '2021-01-01T00:00:00.000Z',
      edited: '2021-01-01T00:00:00.000Z',
      url: 'https://swapi.dev/api/planets/1/',
    },
  ];

  const mockPlanetRepository = {
    find: jest.fn().mockResolvedValue(mockPlanets),
  };

  const mockHttpService = {
    // Define un método get vacío o simulado si es necesario
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://mockapi.com'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        { provide: getRepositoryToken(Planet), useValue: mockPlanetRepository },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    planetRepository = module.get(getRepositoryToken(Planet));
  });

  it('debería retornar una lista de planetas aplicando los filtros correctamente', async () => {
    const filters = { name: 'Tatooine', climate: 'arid' };
    const result = await service.findAll(filters);

    expect(planetRepository.find).toHaveBeenCalledWith({
      where: {
        name: expect.objectContaining({ $regex: expect.any(RegExp) }),
        climate: expect.objectContaining({ $regex: expect.any(RegExp) }),
      },
    });
    expect(result).toEqual(mockPlanets);
  });
});
