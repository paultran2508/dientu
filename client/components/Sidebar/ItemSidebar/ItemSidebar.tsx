import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import Link from "next/link"
import { useRouter } from "next/router"

import style from './ItemSidebar.module.scss'

const cx = classNames.bind(style)

interface PropsItemSidebar {
  icon: string
  text: string
  link: string
}

const ItemSidebar = ({ link, icon, text }: PropsItemSidebar) => {

  const path = useRouter().pathname
  // if () {
  //   console.log(path + 'ok')
  // }

  return (
    <Link href={link} >
      <div className={cx('wrapper', (path === link) && 'active')}>
        <Icon >{icon}</Icon>
        <span>{text}</span>
      </div>
    </Link>
  )
}

export default ItemSidebar