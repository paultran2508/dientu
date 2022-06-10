import HeaderLayout from "../components/Layout/HeaderLayout"
import MuiLayout from "../components/Layout/MuiLayout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import News from "../pages/News"
import Profile from "../pages/Profile"
import { Route } from "../types/Route"

//
export const publicRoute: Route[] = [
  { path: '/', component: Home, layout: MuiLayout },
  { path: '/news', component: News },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login, layout: HeaderLayout },

]

export const privateRoute = []