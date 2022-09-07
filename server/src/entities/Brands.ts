import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Imgs } from "./Imgs";
import { Products } from "./Products";

@ObjectType()
@Entity()
export class Brands extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  name: string

  @Field(_type => Imgs)
  @OneToOne(() => Imgs)
  @JoinColumn()
  img: Imgs

  // @Field(_return => [Products])
  @OneToMany(() => Products, product => product.brand)
  products: Products[]

}