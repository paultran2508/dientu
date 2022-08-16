import { Field, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  path!: string

  @Field(_type => ImgOf)
  @Column({ type: 'enum', enum: ImgOf, default: ImgOf.PRODUCT })
  Of!: ImgOf

  @Field()
  @Column({ type: 'enum', enum: ImgType, default: ImgType.JPG })
  type!: ImgType



}