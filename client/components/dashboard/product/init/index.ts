import { PriceType } from "../../../../src/generated/graphql";

const priceValueInit: AddPriceValue = {
  indexInit: 1,
  colorId: "",
  price: 0,
  note: "",
  type: PriceType.Default
}

export const optionValueInit: AddOptionValue = {
  indexInit: 1,
  addPrices: [priceValueInit],
  addImgs: [],
  name: "",
  valueIds: []
}

export type AddPriceValue = {
  indexInit: number
  colorId: string
  note?: string
  price: number
  type: PriceType

}

export type AddOptionValue = {
  indexInit: number,
  addImgs: string[];
  addPrices: AddPriceValue[];
  name: string;
  valueIds: { name: string, id: string }[],
}

export type AddFormValue = {
  brandId: string
  path: string
  name: string
  categoryId: string
  optionValues: AddOptionValue[]
}