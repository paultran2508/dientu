import { UserResolver } from './UserResolver';
import { Hello } from "./Hello"
import { NonEmptyArray } from 'type-graphql';

const resolves: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Hello,
  UserResolver
]

export default resolves