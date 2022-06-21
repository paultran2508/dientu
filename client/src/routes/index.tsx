import HeaderLayout from "../components/Layout/HeaderLayout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import News from "../pages/News"
import { Product } from "../pages/Product"
import Profile from "../pages/Profile"
import { Route } from "../types/Route"

//
export const publicRoute: Route[] = [
  { path: '/', component: Home },
  { path: '/news', component: News },
  { path: '/profile', component: Profile },
  { path: '/product', component: Product },
  { path: '/login', component: Login, layout: HeaderLayout },

]

export const privateRoute = []