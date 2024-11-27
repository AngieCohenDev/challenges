import { ObjectId } from 'typeorm';

export interface FilmI {
  _id?: ObjectId;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface FilmsApiResponse {
  total : number;
  page : number;
  limit: number;
  results : FilmI[];
}


