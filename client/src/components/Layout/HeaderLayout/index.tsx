import { FunctionComponent } from "react"
import { Children } from "../../../types/Children"
import { Header } from "../components/Header"

const HeaderLayout: FunctionComponent<Children> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default HeaderLayout