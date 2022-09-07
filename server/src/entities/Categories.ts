import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Imgs } from "./Imgs";
import { News } from "./News";
import { Products } from "./Products";
import { TypeCategories } from "./types/TypeCategories";

@ObjectType()
@Entity()
export class Categories extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  name!: string

  @Field(_type => TypeCategories)
  @Column({ type: 'enum', enum: TypeCategories, default: TypeCategories.NEWS })
  type!: TypeCategories

  @Field(_type => Imgs)
  @OneToOne(() => Imgs, img => img.category)
  @JoinColumn()
  img: Imgs

  @Field(_type => Date)
  @CreateDateColumn({ type: "timestamptz" })
  createAt: Date

  @Field(_type => [Products])
  @OneToMany(() => Products, product => product.category)
  products?: Products[]

  @Field(_type => [News])
  @OneToMany(() => News, news => news.category)
  news?: News[]

}