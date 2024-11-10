import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { People } from './entities/person.entity';

describe('PeopleService - findAll', () => {
  let service: PeopleService;
  let peopleRepository: MongoRepository<People>;

  const mockPeople: People[] = [
    {
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2021-01-01T00:00:00.000Z',
      edited: '2021-01-01T00:00:00.000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ];

  const mockPeopleRepository = {
    find: jest.fn().mockResolvedValue(mockPeople),
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
        PeopleService,
        { provide: getRepositoryToken(People), useValue: mockPeopleRepository },
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    peopleRepository = module.get(getRepositoryToken(People));
  });

  it('debería retornar una lista de personas aplicando los filtros correctamente', async () => {
    const filters = { name: 'Luke Skywalker' };
    const result = await service.findAll(filters);

    expect(peopleRepository.find).toHaveBeenCalledWith({
      where: { name: expect.objectContaining({ $regex: expect.any(RegExp) }) },
    });
    expect(result).toEqual(mockPeople);
  });
});
