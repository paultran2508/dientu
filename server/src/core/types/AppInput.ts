import { Express } from 'express'

export interface AppInput {
  env: NodeJS.ProcessEnv,
  express: Express,
}