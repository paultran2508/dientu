import { NewsCategories } from './NewsCategories';
// import { ImgsToProduct } from './ImgsToProduct';
import { ProductPrices } from './ProductPrices';
import { ProductAttributes } from './ProductAttributes';
import { ProductOptions } from './ProductOptions';
import { Products } from './Products';
import { Users } from "./Users"
import { Imgs } from './Imgs';
import { ProductValues } from './ProductValues';
import { Paths } from './Paths';
import { Categories } from './Categories';
import { Contents } from './Contents';
import { News } from './News';
import { Brands } from './Brands';
import { ProductColors } from './ProductColors';

const entities: Function[] = [
  Users, Products, ProductOptions, Imgs, ProductAttributes, ProductValues, Paths, Categories, ProductPrices, Contents, News, Brands, ProductColors, NewsCategories
]

export default entities