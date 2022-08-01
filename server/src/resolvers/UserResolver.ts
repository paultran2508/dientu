import { checkAuth } from './../middleware/checkAuth';
import { Context } from './../types/Context';
import { Theme } from './../entities/types/Theme';
import { createToken } from './../utils/auth';
import { LoginInput } from './../types/inputs/LoginInput';
import { RegisterInput } from './../types/inputs/RegisterInput';
import { UserMutationResponse } from './../types/mutations/UserMutationResponse';
import { User } from './../entities/User';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import argon2 from 'argon2';
// import { Theme } from 'src/entities/types/Theme';

@Resolver()
export class UserResolver {

  @Query(_return => [User])
  @UseMiddleware(checkAuth)
  async users(): Promise<User[]> {
    return await User.find()
  }

  @Query(_return => User, { nullable: true })
  @UseMiddleware(checkAuth)
  async me(
    @Ctx() { user }: Context
  ): Promise<User | null> {
    try {
      const existingUser = await User.findOneBy({ id: user.userId })
      console.log(1)
      return existingUser
    } catch (error) {
      return null
    }
  }

  @Mutation(_return => UserMutationResponse)
  async register(
    @Arg('registerInput') registerInput: RegisterInput
  ): Promise<UserMutationResponse> {
    const { email, password, theme } = registerInput
    // console.log(registerInput)

    if (!email || !password) {
      return {
        code: 400,
        message: 'Not found email or password ',
        success: false,
        fieldError: [{
          name: 'password',
          mess: "password không được để rỗng"
        },
        {
          name: 'email',
          mess: "email không được để rỗng"
        }]
      }
    }

    if (!password) {
      return {
        code: 400,
        message: 'Not found Password ',
        success: false
      }
    }


    const existingUser = await User.findOneBy({ email })
    if (existingUser) {
      return {
        code: 400,
        message: 'Duplicated email',
        success: false
      }
    }

    const hashPassword = await argon2.hash(password)

    const newUser = User.create({
      email, password: hashPassword,
      name: email.split('@')[0],
      theme: theme === Theme.DARK ? Theme.DARK : Theme.LIGHT
    })
    return {
      code: 200,
      success: true,
      message: 'Register account success',
      user: await newUser.save()

    }
  }

  @Mutation(_return => UserMutationResponse)
  async login(
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {

    try {

      const { email, password } = loginInput
      const existingUser = await User.findOneBy({ email })

      /* 
        Error 
      */

      if (!email && !password) {
        return {
          code: 400,
          message: 'Not found email or password11 ',
          success: false,
          fieldError: [{
            name: 'password',
            mess: "password không được để rỗng"
          },
          {
            name: 'email',
            mess: "email không được để rỗng"
          }]
        }
      }



      //Email
      if (!email) return {
        code: 400,
        message: 'Email not found',
        success: false,
        fieldError: [{
          name: 'email',
          mess: "email không được để rỗng"
        }]
      }

      if (!existingUser) return {
        code: 400,
        message: 'Email unregistered',
        success: false,
        fieldError: [
          {
            name: 'email',
            mess: "email chưa đăng ký"
          }
        ]
      }

      //Password
      if (!password) return {
        code: 400,
        message: 'Password unregistered',
        success: false,
        fieldError: [{
          name: 'password',
          mess: "Password không được để rỗng"
        }]
      }

      const checkPassword = await argon2.verify(existingUser.password, password).catch((err) => console.log(err))
      if (!checkPassword) return {
        code: 400,
        message: 'Password incorrect',
        success: false,
        fieldError: [{
          name: "password",
          mess: "Password incorrect"
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