import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { ObjectId } from 'mongodb'; // Cambia la importación a 'mongodb'

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

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

  const mockFilmsService = {
    findAll: jest.fn().mockResolvedValue(mockFilms),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFilms', () => {
    it('debería retornar una lista de películas', async () => {
      const filters = { title: 'Film 1', director: 'Director 1' };
      const result = await controller.getFilms(filters.title, filters.director);

      expect(service.findAll).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockFilms);
    });

    it('debería llamar a filmsService.findAll sin filtros si no se proporcionan', async () => {
      const result = await controller.getFilms();

      expect(service.findAll).toHaveBeenCalledWith({
        title: undefined,
        director: undefined,
        producer: undefined,
        release_date: undefined,
      });
      expect(result).toEqual(mockFilms);
    });
  });
});
