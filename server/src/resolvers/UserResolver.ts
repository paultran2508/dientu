import { createToken } from './../utils/auth';
import { LoginInput } from './../types/inputs/LoginInput';
import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Users } from '../entities/Users';
import { Theme } from './../entities/types/Theme';
import { checkAuth } from './../middleware/checkAuth';
import { Context } from './../types/Context';
import { RegisterInput } from './../types/inputs/RegisterInput';
import { FieldError } from './../types/mutations/FieldError';
import { UserMutationResponse } from './../types/mutations/UserMutationResponse';
import { createBaseResolver, TypeEntityExtension } from './abstract/BaseResolver';
import { HandleErrorResponse } from './exceptions/HandleErrorResult';

const UserBaseResolver = createBaseResolver<Users>({ entity: Users, name: "users" })

@Resolver()
export class UserResolver extends UserBaseResolver {

  setErrors: FieldError[] = [];
  entityExtensions: TypeEntityExtension<Users, keyof Users>[];


  @Query(_return => Users, { nullable: true })
  @UseMiddleware(checkAuth)
  async me(
    @Ctx() { user }: Context
  ): Promise<Users | null> {
    try {
      const existingUser = await Users.findOneBy({ id: user.userId })
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
      const user = await dataSource.transaction(async source => {
        console.log("res")
        if (!password) { this.setErrors.push({ name: "password", message: "password không được để trống " }) }
        if (!email) { this.setErrors.push({ name: "email", message: "email không được để trống " }) }
        if (password !== rePassword) { this.setErrors.push({ name: "rePassword", message: "password không trùng nhau " }) }
        const exitingEmail = await source.findOneBy(Users, { email })
        if (exitingEmail) {
          this.setErrors.push({ name: "email", message: "email đã tồn tại" })
        }
        if (this.setErrors.length > 0) throw new HandleErrorResponse()
        return await source.create(Users, { email, password: await argon2.hash(password as string), theme: Theme.DARK, name: email?.substring(email.indexOf("@"), -1) }).save()
      })
      return this._return({ user })
    } catch (err) { return this.catchQuery(err) }
  }

  @Mutation(_return => UserMutationResponse)
  async login(
    @Arg('loginInput') { email, password }: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {
    try {
      if (!email) this.setErrors.push({ message: "email không được để trống", name: "email" })
      if (!password) this.setErrors.push({ message: "password không được để trống", name: "password" })
      if (email) {
        const emailExiting = await Users.findOneBy({ email })
        if (!emailExiting) this.setErrors.push({ message: "Email chưa đăng ký", name: "email" })
        if (emailExiting) {
          const verifyPassword = await argon2.verify(emailExiting.password, password)
          if (!verifyPassword) this.setErrors.push({ message: "Mật khẩu không đúng ", name: "password" });
          if (verifyPassword) {
            const token = createToken(emailExiting)
            res.cookie(process.env.NAME_COOKIE as string, token, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
            })
            return this._return({ user: emailExiting })
          }
        }
      }
      throw new HandleErrorResponse()
    } catch (error) {
      return this.catchQuery(error)
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