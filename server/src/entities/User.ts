import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ unique: true })
  password!: string

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date

}