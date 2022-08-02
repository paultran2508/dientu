import { UserResolver } from './UserResolver';
import { Hello } from "./Hello"
import { NonEmptyArray } from 'type-graphql';
import { ProductResolver } from './ProductResolver';

const resolves: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Hello,
  UserResolver,
  ProductResolver
]

export default resolves