import classNames from "classnames/bind"
import React from "react"
// import { useRouter } from "next/router"
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { Children } from "../../types/Children"
// import { PropsLayout } from "../types/PropsLayout"
import styled from './DefaultLayout.module.scss'

const cx = classNames.bind(styled)

const DefaultLayout = ({ children }: Children) => {
  return (
    <div data-theme="dark" id="theme-root" className={cx('wrapper')}>
      <div className={cx('navbar')}><Navbar /></div>
      <div className={cx('sidebar')}><Sidebar /></div>
      <div className={cx('content')}>
        {children}
      </div>
    </div >
  )
}




export default DefaultLayout