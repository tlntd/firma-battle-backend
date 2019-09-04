import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  industry: string;

  @Column()
  employees: string;

  @Column()
  location: string;

  @Column()
  logo: string;
}
