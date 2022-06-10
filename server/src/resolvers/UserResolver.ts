import { createToken } from './../utils/auth';
import { LoginInput } from './../types/inputs/LoginInput';
import { RegisterInput } from './../types/inputs/RegisterInput';
import { UserMutationResponse } from './../types/mutations/UserMutationResponse';
import { User } from './../entities/User';
import { Arg, Mutation, Resolver } from "type-graphql";
import argon2 from 'argon2';

@Resolver()
export class UserResolver {
  @Mutation(_return => UserMutationResponse)
  async register(
    @Arg('registerInput') registerInput: RegisterInput
  ): Promise<UserMutationResponse> {
    const { email, password } = registerInput
    console.log(registerInput)
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
      email, password: hashPassword, name: email.split('@')[0]
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
    @Arg('loginInput')
    loginInput: LoginInput
  ): Promise<UserMutationResponse> {

    try {
      const { email, password } = loginInput

      //check email
      const existingUser = await User.findOneBy({ email })


      if (!existingUser) return {
        code: 400,
        message: 'Not found email or password',
        success: false
      }

      //check password
      const checkPassword = await argon2.verify(existingUser.password, password).catch((err) => console.log(err))
      // console.log(existingUser, password)

      if (checkPassword && existingUser) return {
        code: 200,
        message: 'Login success',
        success: true,
        user: existingUser,
        accessToken: createToken(existingUser)
      }

      //Error Server
      return {
        code: 400,
        message: 'password not match',
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
}