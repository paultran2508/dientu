import { ProductOptions } from './ProductOptions';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paths } from './Paths';
import { Categories } from './Categories';

@ObjectType()
@Entity()
export class Products extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  name: string

  @Field()
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
}