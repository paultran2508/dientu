import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Users } from '../entities/Users';
import { Theme } from './../entities/types/Theme';
import { checkAuth } from './../middleware/checkAuth';
import { Context } from './../types/Context';
import { LoginInput } from './../types/inputs/LoginInput';
import { RegisterInput } from './../types/inputs/RegisterInput';
import { FieldError } from './../types/mutations/FieldError';
import { UserMutationResponse } from './../types/mutations/UserMutationResponse';
import { createToken } from './../utils/auth';
import { createBaseResolver, TypeEntityExtension } from './abstract/BaseResolver';
import { CustomError, HandleErrorResponse } from './exceptions/HandleErrorResult';
// import { Theme } from 'src/entities/types/Theme';
const UserBaseResolver = createBaseResolver<Users>({ entity: Users, name: "users" })

@Resolver()
export class UserResolver extends UserBaseResolver {

  entityExtensions: TypeEntityExtension<Users, keyof Users>[];

  @Query(_return => [Users])
  @UseMiddleware(checkAuth)
  async users(): Promise<Users[]> {
    return await Users.find()
  }

  @Query(_return => Users, { nullable: true })
  @UseMiddleware(checkAuth)
  async me(
    @Ctx() { user }: Context
  ): Promise<Users | null> {
    try {
      const existingUser = await Users.findOneBy({ id: user.userId })
      console.log(1)
      return existingUser
    } catch (error) {
      return null
    }
  }

  @Mutation(_return => UserMutationResponse)
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() { dataSource }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { email, password, rePassword } = registerInput
      let setErrors: FieldError[] = []
      const user = await dataSource.transaction(async source => {
        if (!password) { setErrors.push({ name: "password", message: "password không được để trống " }) }
        if (!email) { setErrors.push({ name: "email", message: "email không được để trống " }) }
        if (password !== rePassword) { setErrors.push({ name: "rePassword", message: "password không trùng nhau " }) }
        const exitingEmail = await source.findOneBy(Users, { email })
        if (exitingEmail) setErrors.push({ name: "email", message: "email đã tồn tại" })
        if (setErrors.length > 0) throw new HandleErrorResponse<CustomError>({ detail: "a", code: "404", name: "sss", message: "s", fieldErrors: setErrors })
        return await source.create(Users, { email, password: await argon2.hash(password as string), theme: Theme.DARK, name: email?.substring(email.indexOf("@"), -1) }).save()
      })
      return this._return({ user })
    } catch (err) { return this.catchQuery(err) }

  }

  @Mutation(_return => UserMutationResponse)
  async login(
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {

    try {

      const { email, password } = loginInput
      const existingUser = await Users.findOneBy({ email })

      /* 
        Error 
      */

      if (!email && !password) {
        return {
          code: 400,
          message: 'Not found email or password11 ',
          success: false,
          fieldErrors: [{
            name: 'password',
            message: "password không được để rỗng"
          },
          {
            name: 'email',
            message: "email không được để rỗng"
          }]
        }
      }



      //Email
      if (!email) return {
        code: 400,
        message: 'Email not found',
        success: false,
        fieldErrors: [{
          name: 'email',
          message: "email không được để rỗng"
        }]
      }

      if (!existingUser) return {
        code: 400,
        message: 'Email unregistered',
        success: false,
        fieldErrors: [
          {
            name: 'email',
            message: "email chưa đăng ký"
          }
        ]
      }

      //Password
      if (!password) return {
        code: 400,
        message: 'Password unregistered',
        success: false,
        fieldErrors: [{
          name: 'password',
          message: "Password không được để rỗng"
        }]
      }

      const checkPassword = await argon2.verify(existingUser.password, password).catch((err) => console.log(err))
      if (!checkPassword) return {
        code: 400,
        message: 'Password incorrect',
        success: false,
        fieldErrors: [{
          name: "password",
          message: "Password incorrect"
        }]
      }
      /* Success */

      if (existingUser && checkPassword) {
        //Set Cookie
        const token = createToken(existingUser)
        res.cookie(process.env.NAME_COOKIE as string, token, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        })
        return {
          code: 200,
          message: 'Login success',
          success: true,
          user: existingUser,
          accessToken: token
        }
      }

      return {
        code: 400,
        message: 'Login fail',
        success: false,
      }
    } catch (error) {
      return {
        code: 500,
        message: 'Server Interval error',
        success: false,
      }

    }
  }

  @Mutation(_return => Boolean)
  async logout(
    @Ctx() { res }: Context
  ): Promise<boolean> {
    try {
      res.clearCookie(process.env.NAME_COOKIE as string)
      return true
    } catch (error) {
      return false
    }
  }


}