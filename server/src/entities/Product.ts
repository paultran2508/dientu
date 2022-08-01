import { ProductOptions } from './ProductOptions';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paths } from './Paths';

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
}