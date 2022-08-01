import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Images } from './Images';
import { Products } from './Product';



@ObjectType()
@Entity()
export class ProductOptions extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @CreateDateColumn({ type: 'date' })
  createAt: Date

  @Field()
  @Column()
  name: string

  @Field(_type => [Images])
  @ManyToMany(() => Images)
  @JoinTable()
  imgs: Images[]

  @Field(_type => Products)
  @ManyToOne(() => Products, (product) => product.options)
  product: Products


}