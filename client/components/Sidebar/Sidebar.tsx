import classNames from "classnames/bind"
import { ItemSidebar } from "./ItemSidebar"
import style from './Sidebar.module.scss'

const cx = classNames.bind(style)

const Sidebar = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('ctn-item')}>
        <ItemSidebar link="/" icon="home" text="Trang chủ" />
        <ItemSidebar link="/product" icon="category" text="Sản phẩm" />
        <ItemSidebar link="/news" icon="newspaper" text="Tin tức" />
        <ItemSidebar link="/profile" icon="manage_accounts" text="Cá nhân" />
        <ItemSidebar link="/cart" icon="shopping_cart" text="Đơn hàng" />
        <ItemSidebar link="/contacts" icon="contacts" text="Liên hệ" />
      </div>
    </div>
  )
}

export default Sidebar