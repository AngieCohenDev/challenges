import { ApiProperty } from '@nestjs/swagger';
import { FilmI } from '../interface/films.interface';

export class CreateFilmDto implements FilmI {
  @ApiProperty({ description: 'Title of the film' })
  title: string;

  @ApiProperty({ description: 'Episode number of the film' })
  episode_id: number;

  @ApiProperty({ description: 'Opening crawl text of the film' })
  opening_crawl: string;

  @ApiProperty({ description: 'Director of the film' })
  director: string;

  @ApiProperty({ description: 'Producer of the film' })
  producer: string;

  @ApiProperty({
    description: 'Release date of the film',
    example: '1977-05-25',
  })
  release_date: string;

  @ApiProperty({ description: 'List of characters URLs', type: [String] })
  characters: string[];

  @ApiProperty({ description: 'List of planets URLs', type: [String] })
  planets: string[];

  @ApiProperty({ description: 'List of starships URLs', type: [String] })
  starships: string[];

  @ApiProperty({ description: 'List of vehicles URLs', type: [String] })
  vehicles: string[];

  @ApiProperty({ description: 'List of species URLs', type: [String] })
  species: string[];

  @ApiProperty({
    description: 'Creation date of the film data',
    example: '2014-12-10T14:23:31.880Z',
  })
  created: Date;

  @ApiProperty({
    description: 'Last edit date of the film data',
    example: '2014-12-20T19:49:45.256Z',
  })
  edited: Date;

  @ApiProperty({ description: 'URL of the film resource' })
  url: string;
}
