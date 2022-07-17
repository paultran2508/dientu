import classNames from "classnames/bind"
import { ItemSidebar } from "./ItemSidebar"
import style from './Sidebar.module.scss'

const cx = classNames.bind(style)

const Sidebar = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('ctn-item')}>
        <ItemSidebar link="/" icon="home" text="Trang chu" />
        <ItemSidebar link="/product" icon="category" text="San pham" />
        <ItemSidebar link="/news" icon="newspaper" text="Tin tuc" />
        <ItemSidebar link="/profile" icon="manage_accounts" text="Profile" />
        <ItemSidebar link="/contacts" icon="contacts" text="Lien he" />
      </div>
    </div>
  )
}

export default Sidebar