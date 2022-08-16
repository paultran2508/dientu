import { UserResolver } from './UserResolver';
import { Hello } from "./Hello"
import { NonEmptyArray } from 'type-graphql';
import { ProductResolver, ProductsBaseResolver } from './product/ProductResolver';



const resolves: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Hello,
  UserResolver,
  ProductResolver,
  ProductsBaseResolver
]

export default resolves