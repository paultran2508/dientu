import { Secret, sign } from 'jsonwebtoken';
import { User } from './../entities/User';
export const createToken = (user: User) => {
  return sign(
    { userId: user.id },
    process.env.SECRET_TOKEN as Secret,
    { expiresIn: '15m' }
  )
}