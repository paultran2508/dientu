import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import Link from "next/link"
import { memo } from "react"
import { HandleClickButton } from "."
import style from './Button.module.scss'


const cx = classNames.bind(style)

type Props = {
  text?: React.ReactNode
  icon?: string
  loading?: boolean
  fullWidth?: boolean,
  handle?: HandleClickButton,
  link?: string
  submit?: boolean
  test?: string
  alt?: string
}


const Button = (props: Props) => {


  const { icon, text, link, handle, loading, fullWidth, submit } = props

  // console.log('render: ', text)

  const buttonEl: React.ReactNode = <button type={submit ? 'submit' : 'button'} onClick={handle} className={cx('button-custom', fullWidth && 'full-width')} >
    {loading ? (<span>loading ... </span>) : <>{text && <span className={cx('text')}>{text}</span>}
      {icon && <Icon >{icon}</Icon>}</>}

  </button >

  return (<>{link ? <Link href={link} >{buttonEl}</Link> : <>{buttonEl}</>} </>)
}




export default memo(Button)