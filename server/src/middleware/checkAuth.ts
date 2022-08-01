import { UserAuthPayload } from './../core/types/UserAuthPayload';
import { Context } from './../types/Context';
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from 'apollo-server-core';
import { Secret, verify } from 'jsonwebtoken';
// import { ErrorCheckAuth } from './ErrorCheckAuth';

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
  try {
    const secret = process.env.SECRET_TOKEN as Secret

    const parseCookie = context.req.headers.cookie?.split('=') || []
    // console.log(context.req.headers.cookie?.split('=')[0] === process.env.NAME_COOKIE)
    if (!parseCookie[1] && parseCookie[0] === process.env.NAME_COOKIE) {
      throw new AuthenticationError('Loi khong co token')
    }
    const decodeUser = verify(parseCookie[1], secret) as UserAuthPayload

    context.user = decodeUser
    return next()
  } catch (error) {

    if (error.message == 'jwt must be provided') {
      throw new AuthenticationError('Bạn chưa đăng nhập')
    }

    if (error.message) {
      throw new AuthenticationError('loi')
    }


    throw new AuthenticationError('Server Interval Error ')
  }

}