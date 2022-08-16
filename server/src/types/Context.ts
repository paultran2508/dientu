import { UserAuthPayload } from './../core/types/UserAuthPayload';
import { Variable } from './../core/types/Variable';
import { Request, Response } from 'express'
import {  DataSource } from 'typeorm';

export interface Context {
  req: Request
  res: Response
  variable: Variable
  user: UserAuthPayload
  dataSource: DataSource
}