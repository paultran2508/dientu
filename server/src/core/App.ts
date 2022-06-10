import { Apollo } from './../apollo/connect';
import { AppConnectPostgres } from './../postgres/connect'
import { AppInput } from './types/AppInput';


export class App {

  constructor(public appInput: AppInput) {

  }

  connects() {

    //Start Postgresql
    AppConnectPostgres({
      username: this.appInput.env.DB_USERNAME as string,
      password: this.appInput.env.DB_PASSWORD as string,
      host: this.appInput.env.DB_HOST as string,
      database: this.appInput.env.DB_DATABASE as string,
    })

    //Start Apollo
    Apollo(this.appInput.express, { port: parseInt(this.appInput.env.PORT_GRAPHQL as string), secret: this.appInput.env.SECRET_TOKEN as string })
  }

  startServer() {
    const port = this.appInput.env.PORT_SERVER ?? 2000
    this.appInput.express.listen(port, () => console.log(`Start server on ${port}`))
  }

  run() {
    this.connects()

    this.startServer()
  }

}

