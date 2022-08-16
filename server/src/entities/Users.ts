import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Theme } from './types/Theme';



@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

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
  @Column({ type: "enum", enum: Theme, default: Theme.DARK })
  theme: Theme

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date

  @Field()
  @Column({ type: String, default: '/avatar_1.png' })
  avatar: string

}