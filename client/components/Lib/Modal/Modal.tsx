import classNames from "classnames/bind"
import { Dispatch } from "react"
import { Button } from "../Button"
import style from "./modal.module.scss"

const cx = classNames.bind(style)
type Props = {
  children: React.ReactNode
  open: Dispatch<React.SetStateAction<boolean>>
  // showModal: boolean
}

const Modal = ({ children, open }: Props) => {


  return (
    <div className={cx("modal")}>

      <div className={cx("content")}>
        <div className={cx("close")}>
          <Button text="Đóng" handle={() => {
            open(false)
          }} />
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal