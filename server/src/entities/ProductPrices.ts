import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductColors } from "./ProductColors";
import { ProductOptions } from "./ProductOptions";

export enum PriceType {
  DEFAULT = "default",
  HISTORICAL_COST = "historical cost",
  SALE = "sale",
  INCREASE = "increase",
  RAISE = "raise"
}

registerEnumType(PriceType, {
  name: 'PriceType'
})

@ObjectType()
@Entity()
export class ProductPrices {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ nullable: false })
  price!: number

  @Field()
  @Column()
  note: string

  @Field(_type => PriceType)
  @Column({ type: "enum", "enum": PriceType, default: PriceType.DEFAULT, })
  type: PriceType

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt!: Date

  // @Field(_type => ProductOptions)
  @ManyToOne(() => ProductOptions, option => option.prices, { onDelete: "CASCADE" })
  option: ProductOptions

  @Field(_type => ProductColors)
  @ManyToOne(() => ProductColors, { cascade: true })
  @JoinColumn()
  color!: ProductColors
}


