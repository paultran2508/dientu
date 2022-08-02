import { ImagesToProduct } from './ImagesToProduct';
import { Prices } from './Prices';
import { ProductAttributes } from './ProductAttributes';
import { ProductOptions } from './ProductOptions';
import { Products } from './Product';
import { User } from "./User"
import { Images } from './Images';
import { ProductValues } from './ProductValues';
import { Paths } from './Paths';
import { Categories } from './Categories';
import { Contents } from './Contents';
import { News } from './News';

const entities: Function[] = [
  User, Products, ProductOptions, Images, ProductAttributes, ProductValues, Paths, Categories, Prices, ImagesToProduct, Contents, News
]

export default entities