import { ReactElement } from "react"
import { publicRoute } from "../router"
import { DefaultLayout } from "./DefaultLayout"

const getLayout = (component: ReactElement, path: string) => {

  const routes = publicRoute.filter(router => router.path === path)[0]
  const Layout = routes ? routes.layout : DefaultLayout

  return (<Layout>{component}</Layout>)
}

export default getLayout
