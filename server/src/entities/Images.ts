import { Field } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ImageType {
  ICON = 'png',
  JPG = 'jpg',
  GIF = 'gif'
}

export enum ImageOf {
  PRODUCT = 'product',
  NEWS = 'news',
  USER = 'user',
  ICON = 'icon'
}

@Entity()
export abstract class Images {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  path!: string

  @Field(_type => ImageOf)
  @Column({ type: 'enum', enum: ImageOf, default: ImageOf.PRODUCT })
  Of!: ImageOf

  @Field()
  @Column({ type: 'enum', enum: ImageType, default: ImageType.JPG })
  type!: ImageType

}