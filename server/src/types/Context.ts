import { UserAuthPayload } from './../core/types/UserAuthPayload';
import { Variable } from './../core/types/Variable';
import { Request, Response } from 'express'

export interface Context {
  req: Request
  res: Response
  variable: Variable
  user: UserAuthPayload
}