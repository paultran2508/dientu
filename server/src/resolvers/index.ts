import { ImgResolver } from './product/ImgResolver';
import { BrandResolver } from './product/BrandResolver';
import { CategoryResolver } from './product/CategoryResolver';
import { UserResolver } from './UserResolver';
import { Hello } from "./Hello"
import { NonEmptyArray } from 'type-graphql';
import { ProductResolver, ProductsBaseResolver } from './product/ProductResolver';
import { ProductValueResolver } from './product/ProductValueResolver';


const resolves: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Hello,
  UserResolver,
  ProductResolver,
  ProductsBaseResolver,
  CategoryResolver,
  BrandResolver,
  ProductValueResolver,
  ImgResolver
]

export default resolves