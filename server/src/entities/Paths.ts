import { Field } from "type-graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./Product";

@Entity()
export abstract class Paths {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  url: string

  @Field(_type => Products)
  @OneToOne(() => Products, (product) => product.path)
  product: Products

}