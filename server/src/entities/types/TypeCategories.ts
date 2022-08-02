import { registerEnumType } from "type-graphql";

export enum TypeCategories {
  PRODUCT = 'product',
  NEWS = 'news'
}

registerEnumType(TypeCategories, {
  name: "TypeCategories"
})