import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Starship {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

  @Column()
  starship_class: string;

  @Column('array', { nullable: true })
  pilots: string[];

  @Column('array', { nullable: true })
  films: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}
