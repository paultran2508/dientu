import { ProductAttributes } from './ProductAttributes';
import { ProductOptions } from './ProductOptions';
// import { Images } from './Images';
import { Products } from './Product';
import { User } from "./User"
import { Images } from './Images';
import { ProductValues } from './ProductValues';
import { Paths } from './Paths';

const entities: Function[] = [
  User, Products, ProductOptions, Images, ProductAttributes, ProductValues, Paths
]

export default entities