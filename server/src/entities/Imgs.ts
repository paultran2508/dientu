import { ProductOptions } from './ProductOptions';
import { Categories } from './Categories';
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { News } from './News';

export enum ImgType {
  ICON = 'png',
  JPG = 'jpg',
  GIF = 'gif'
}


export enum ImgOf {
  PRODUCT = 'product',
  NEWS = 'news',
  USER = 'user',
  ICON = 'icon'
}

registerEnumType(ImgOf, {
  name: 'ImgOf'
})

@ObjectType()
@Entity()
export class Imgs extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string


  @Field({})
  @Column({ unique: true })
  name!: string

  @Field(_type => ImgOf)
  @Column({ type: 'enum', enum: ImgOf, default: ImgOf.PRODUCT })
  Of!: ImgOf

  @Field()
  @Column({ type: 'enum', enum: ImgType, default: ImgType.JPG })
  type!: ImgType


  @OneToOne(() => Categories, category => category.img)
  category: Categories


  @OneToOne(() => News, category => category.img)
  news: News

  @ManyToMany(() => ProductOptions, option => option.imgs, { onDelete: "CASCADE" })
  options: ProductOptions[]

  // @OneToOne(() => News, category => category.img)e



}