import classNames from "classnames/bind"
import React from "react"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import { Button } from "../Lib/Button"
import styled from "./dashboard-layout.module.scss"


const cx = classNames.bind(styled)

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <DefaultLayout>
      <div className={cx("wrapper")}>
        <div className={cx("menu")}>
          <Button link="/dashboard/product" text="Sản Phẩm" />
          <Button link="/dashboard/news" text="Tin Tức" />
        </div>
        <div className={cx("content")}>
          {children}
        </div>

      </div>
    </DefaultLayout>


  )
}




export default DashboardLayout