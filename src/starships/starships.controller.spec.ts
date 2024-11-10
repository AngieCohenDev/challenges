import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { Starship } from './entities/starship.entity';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;

  const mockStarships: Starship[] = [
    {
      id: '1',
      name: 'X-wing',
      model: 'T-65 X-wing',
      manufacturer: 'Incom Corporation',
      cost_in_credits: '149999',
      length: '12.5',
      max_atmosphering_speed: '1050',
      crew: '1',
      passengers: '0',
      cargo_capacity: '110',
      consumables: '1 week',
      hyperdrive_rating: '1.0',
      MGLT: '100',
      starship_class: 'Starfighter',
      pilots: ['https://swapi.dev/api/people/1/'],
      films: ['https://swapi.dev/api/films/1/'],
      created: '2021-01-01T00:00:00.000Z',
      edited: '2021-01-01T00:00:00.000Z',
      url: 'https://swapi.dev/api/starships/1/',
    },
  ];

  const mockStarshipsService = {
    findAll: jest.fn().mockResolvedValue(mockStarships),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        {
          provide: StarshipsService,
          useValue: mockStarshipsService,
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar una lista de naves espaciales', async () => {
      const filters = { name: 'X-wing', model: 'T-65 X-wing' };
      const result = await controller.findAll(filters.name, filters.model);

      expect(service.findAll).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockStarships);
    });

    it('debería llamar a starshipsService.findAll sin filtros si no se proporcionan', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({
        name: undefined,
        model: undefined,
        manufacturer: undefined,
        starship_class: undefined,
      });
      expect(result).toEqual(mockStarships);
    });
  });
});
