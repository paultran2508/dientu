import { UserAuthPayload } from './../core/types/UserAuthPayload';
import { Context } from './../types/Context';
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from 'apollo-server-core';
import { Secret, verify } from 'jsonwebtoken';

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
  try {
    const secret = process.env.SECRET_TOKEN as Secret
    const authHeader = context.req.header('Authorization')
    const accessToken = authHeader && authHeader.split(' ')[1]


    if (!accessToken) {
      throw new AuthenticationError('Loi khong co token')
    }

    const decodeUser = verify(accessToken, secret) as UserAuthPayload
    // console.log(decodeUser)
    context.user = decodeUser



    return next()
  } catch (error) {
    if (error.message) {
      throw new AuthenticationError(error.message)
    }

    throw new AuthenticationError('Server Interval Error ')
  }

}