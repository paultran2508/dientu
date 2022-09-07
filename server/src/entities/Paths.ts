import { Products } from './Products';
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Paths extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string


  @Field()
  @Column({ unique: true })
  name: string

  @OneToOne(() => Products, product => product.path, { onDelete: "CASCADE", nullable: true })
  product?: Products


}