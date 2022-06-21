import classNames from "classnames/bind"
import styles from './Default.module.scss'
import { Children } from "../../../types/Children"
import Sidebar from "../components/Sidebar/Sidebar"
import { Header } from "../components/Header"

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }: Children) => {
  return (
    <div className={cx('wrapper')}>

      <div className={cx('header')}><Header /></div>
      <div className={cx('sidebar')}><Sidebar /></div>
      <div className={cx('content')}>
        {children}
      </div>
    </div >
  )
}

export default DefaultLayout