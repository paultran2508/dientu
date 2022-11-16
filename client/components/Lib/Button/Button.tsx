import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import Link from "next/link"
import { HandleClickButton } from "."
import style from './Button.module.scss'


const cx = classNames.bind(style)

export type ButtonProps<T> = {
  text?: React.ReactNode
  icon?: string
  loading?: boolean
  fullWidth?: boolean,
  handle?: HandleClickButton<T>,
  link?: string
  submit?: boolean
  alt?: string
  data?: T,
  // callbackData?: (data?: T) => void
  // test?: Gene<string>
}

// type Gene = <T>(name: T) => void


function Button<T>({ icon, text, link, handle, loading, fullWidth, submit, data }: ButtonProps<T>) {

  // 

  const buttonEl: React.ReactNode = <button
    type={submit ? 'submit' : 'button'}

    onClick={(e) => {
      !loading && handle && handle(e, data)
    }}
    className={cx('button-custom', fullWidth && 'full-width')} >
    {loading ? (<span>loading ... </span>) : <>{text && <span className={cx('text')}>{text}</span>}
      {icon && <Icon >{icon}</Icon>}</>}

  </button >

  return (<>{link ? <Link href={link} >{buttonEl}</Link> : <>{buttonEl}</>} </>)
}




export default Button