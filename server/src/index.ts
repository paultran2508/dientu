import 'reflect-metadata'
require('dotenv').config()
import express from 'express'
import { App } from './core/App'

const main = async () => {

  const exp = express()
  const app = new App({
    express: exp,
    env: process.env,
  })

  app.run()

}

main().catch(err => console.log(err));