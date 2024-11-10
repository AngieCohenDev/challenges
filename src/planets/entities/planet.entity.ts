import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Planet {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  @Column('array', { nullable: true })
  residents: string[];

  @Column('array', { nullable: true })
  films: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
