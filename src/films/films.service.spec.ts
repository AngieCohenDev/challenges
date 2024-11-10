import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import { of } from 'rxjs';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: Repository<Film>;

  const mockFilms: Film[] = [
    {
      _id: new ObjectId(),
      title: 'Film 1',
      episode_id: 1,
      opening_crawl: 'Intro text...',
      director: 'Director 1',
      producer: 'Producer 1',
      release_date: '2021-01-01',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: new Date(),
      edited: new Date(),
      url: 'https://example.com/film1',
    },
    {
      _id: new ObjectId(),
      title: 'Film 2',
      episode_id: 2,
      opening_crawl: 'Intro text...',
      director: 'Director 2',
      producer: 'Producer 2',
      release_date: '2021-02-01',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: new Date(),
      edited: new Date(),
      url: 'https://example.com/film2',
    },
  ];

  const mockFilmRepository = {
    find: jest.fn().mockResolvedValue(mockFilms),
  };

  const mockHttpService = {
    get: jest.fn().mockReturnValue(of({ data: { results: mockFilms } })),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://mockapi.com'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
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

    service = module.get<FilmsService>(FilmsService);
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar una lista de películas', async () => {
      const filters = { title: 'Film' };
      const result = await service.findAll(filters);

      expect(filmRepository.find).toHaveBeenCalledWith({
        where: {
          title: expect.any(Object),
        },
      });
      expect(result).toEqual(mockFilms);
    });
  });
});
