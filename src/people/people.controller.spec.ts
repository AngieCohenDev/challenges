import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People } from './entities/person.entity';


describe('PeopleController', () => {
  let controller: PeopleController;
  let service: PeopleService;

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

  const mockPeopleService = {
    findAll: jest.fn().mockResolvedValue(mockPeople),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: mockPeopleService,
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar una lista de personas', async () => {
      const nameFilter = 'Luke Skywalker';
      const result = await controller.findAll(nameFilter);

      expect(service.findAll).toHaveBeenCalledWith({ name: nameFilter });
      expect(result).toEqual(mockPeople);
    });

    it('debería llamar a peopleService.findAll sin filtros si no se proporcionan', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockPeople);
    });
  });
});
