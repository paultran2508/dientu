import { Field } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeCategories } from "./types/TypeCategories";


@Entity()
export class Contents {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string

  @Field()
  @Column()
  title: string

  @Column()
  content: string

  @Column()
  type: TypeCategories

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date


}