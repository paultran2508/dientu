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

  @Field()
  @Column()
  categoryId: string

  @Field(_type => Date)
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createAt: Date

  @Field(_type => [ProductOptions])
  @OneToMany(() => ProductOptions, option => option.product, { cascade: true })
  options: ProductOptions[]

  @Field(_type => Paths)
  @OneToOne(() => Paths, path => path.product, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  path: Paths

  @Field(_type => Categories)
  @ManyToOne(() => Categories, category => category.products)
  category: Categories

  @Field(_type => Brands)
  @ManyToOne(() => Brands, brand => brand.products)
  brand: Brands
}