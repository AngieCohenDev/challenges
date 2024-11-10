import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('StarshipsService - findAll', () => {
  let service: StarshipsService;
  let starshipRepository: MongoRepository<Starship>;

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

  const mockStarshipRepository = {
    find: jest.fn().mockResolvedValue(mockStarships),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://mockapi.com'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: getRepositoryToken(Starship),
          useValue: mockStarshipRepository,
        },
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    starshipRepository = module.get(getRepositoryToken(Starship));
  });

  it('debería retornar una lista de naves espaciales aplicando los filtros correctamente', async () => {
    const filters = { name: 'X-wing', model: 'T-65 X-wing' };
    const result = await service.findAll(filters);

    expect(starshipRepository.find).toHaveBeenCalledWith({
      where: {
        name: expect.objectContaining({ $regex: expect.any(RegExp) }),
        model: expect.objectContaining({ $regex: expect.any(RegExp) }),
      },
    });
    expect(result).toEqual(mockStarships);
  });
});
