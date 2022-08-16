import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Brands } from './Brands';
import { Categories } from './Categories';
import { Paths } from './Paths';
import { ProductOptions } from './ProductOptions';

@Entity()
@ObjectType()
export class Products extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  name: string

  @Field(_type => Date)
  @CreateDateColumn({ type: 'date' })
  createAt: Date

  @Field(_type => [ProductOptions])
  @OneToMany(() => ProductOptions, option => option.product)
  options: ProductOptions[]

  @Field(_type => Paths)
  @OneToOne(() => Paths)
  @JoinColumn()
  path: Paths

  @Field(_type => Categories)
  @ManyToOne(() => Categories, category => category.products)
  category: Categories

  @Field(_type => Brands)
  @OneToOne(() => Brands)
  @JoinColumn()
  brand: Brands
}