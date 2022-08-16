import { Users } from '../entities/Users';
import { Context } from './../types/Context';
import { checkAuth } from './../middleware/checkAuth';
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql"

@Resolver()
export class Hello {
  @Query(_return => String)
  @UseMiddleware(checkAuth)
  async hello(
    @Ctx()
    { user }: Context
  ): Promise<string> {
    const existingUser = await Users.findOneBy({ id: user.userId, })
    console.log(existingUser)
    return `hello ${existingUser?.name} login`
  }
}