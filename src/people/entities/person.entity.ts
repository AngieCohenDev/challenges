import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class People {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @Column()
  homeworld: string;

  @Column('array', { nullable: true })
  films: string[];

  @Column('array', { nullable: true })
  species: string[];

  @Column('array', { nullable: true })
  vehicles: string[];

  @Column('array', { nullable: true })
  starships: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
