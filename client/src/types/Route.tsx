import { FunctionComponent } from "react"
import { Children } from "./Children"

export interface Route {
  path: string
  component: FunctionComponent
  layout?: FunctionComponent<Children>

}