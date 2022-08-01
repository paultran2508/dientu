import { Field } from "type-graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export class Prices {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ nullable: false })
  optionId!: number

  @Field()
  @Column()
  note: string

  @Field()
  @Column({ type: 'date' })
  date!: Date

}