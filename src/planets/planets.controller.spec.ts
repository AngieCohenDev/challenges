import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { Planet } from './entities/planet.entity';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let service: PlanetsService;

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
      residents: ['https://swapi.dev/api/people/1/'],
      films: ['https://swapi.dev/api/films/1/'],
      created: '2021-01-01T00:00:00.000Z',
      edited: '2021-01-01T00:00:00.000Z',
      url: 'https://swapi.dev/api/planets/1/',
    },
    {
      id: '2',
      name: 'Alderaan',
      rotation_period: '24',
      orbital_period: '364',
      diameter: '12500',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '40',
      population: '2000000000',
      residents: ['https://swapi.dev/api/people/2/'],
      films: ['https://swapi.dev/api/films/2/'],
      created: '2021-02-01T00:00:00.000Z',
      edited: '2021-02-01T00:00:00.000Z',
      url: 'https://swapi.dev/api/planets/2/',
    },
  ];

  const mockPlanetsService = {
    findAll: jest.fn().mockResolvedValue(mockPlanets),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        {
          provide: PlanetsService,
          useValue: mockPlanetsService,
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar una lista de planetas', async () => {
      const filters = { name: 'Tatooine', climate: 'arid' };
      const result = await controller.findAll(filters.name, filters.climate);

      expect(service.findAll).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockPlanets);
    });

    it('debería llamar a planetsService.findAll sin filtros si no se proporcionan', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({
        name: undefined,
        climate: undefined,
        terrain: undefined,
        population: undefined,
      });
      expect(result).toEqual(mockPlanets);
    });
  });
});
