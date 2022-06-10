// import { FunctionComponent } from 'react'
import { Children } from '../../types/Children'
import './GlobalStyle.scss'
import './lib.scss'
import './reset.scss'



const GlobalStyle = ({ children }: Children) => {
  return <>{children}</>
}

export default GlobalStyle