import { Secret, sign } from 'jsonwebtoken';
import { Users } from '../entities/Users';
export const createToken = (user: Users) => {
  return sign(
    { userId: user.id },
    process.env.SECRET_TOKEN as Secret,
    { expiresIn: '30d' }
  )
}