import { FunctionComponent } from "react"
import { DefaultLayout } from "../layouts/DefaultLayout"
import { Children } from "../types/Children"

interface Route {
  path: string
  layout: FunctionComponent<Children>

}
export const publicRoute: Route[] = [
  { path: '/', layout: DefaultLayout },
  // { path: '/news', component: News },
  // { path: '/profile', component: Profile },
  // { path: '/product', component: Product },
  // { path: '/login', component: Login },
  // { path: '/cart', component: Login, layout: HeaderLayout },
  // { path: '/logout', component: Logout, layout: HeaderLayout },

]

export const privateRoute = []