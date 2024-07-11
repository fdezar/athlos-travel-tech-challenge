import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('text')
  description: string;

  @Column()
  reviewScore: number;

  @Column()
  numberOfComments: number;

  @Column('simple-array')
  photos: string[];

  @Column('simple-array')
  amenities: string[];
}
