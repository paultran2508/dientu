import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import Link from "next/link"

import style from './ItemSidebar.module.scss'

const cx = classNames.bind(style)

interface PropsItemSidebar {
  icon: string
  text: string
  link: string
}

const ItemSidebar = ({ link, icon, text }: PropsItemSidebar) => {
  return (
    <Link href={link} >
      <div className={cx('wrapper')}>
        <Icon >{icon}</Icon>
        <span>{text}</span>
      </div>
    </Link>
  )
}

export default ItemSidebar