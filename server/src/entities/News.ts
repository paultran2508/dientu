import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contents } from "./Contents";
import { Imgs } from "./Imgs";
import { NewsCategories } from './NewsCategories';
import { Paths } from "./Paths";

@ObjectType()
@Entity()
export class News extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  title!: string

  @Field()
  @Column({ default: 2 })
  top!: number

  @Field(_return => Imgs)
  @OneToOne(() => Imgs, img => img.news)
  @JoinColumn()
  img: Imgs

  @Field(_return => Contents)
  @OneToOne(() => Contents, content => content.news)
  @JoinColumn()
  content: Contents

  @Field()
  @OneToOne(() => Paths, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  path: Paths

  @Field(_type => NewsCategories)
  @ManyToOne(() => NewsCategories, category => category.news, { cascade: true })
  category: NewsCategories

}