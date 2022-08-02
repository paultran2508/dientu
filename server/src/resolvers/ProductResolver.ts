import { Products } from './../entities/Product';
import { Query } from "type-graphql";

export class ProductResolver {
  @Query(_return => [Products])
  async products(): Promise<Products[]> {
    const products = await Products.find()

    return products
  }


}