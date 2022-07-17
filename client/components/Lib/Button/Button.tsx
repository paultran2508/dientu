import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import style from './Button.module.scss'


const cx = classNames.bind(style)

type Props = {
  text?: string
  icon?: string
  loading?: boolean
  fullWidth?: boolean,
  handle?: () => void
}

const Button = (props: Props) => {
  const { icon, text, handle, loading } = props

  return (
    <button onClick={handle} className={cx('button-custom')} >
      {loading ? (<span>loading ... </span>) : <>{text && <span className={cx('text')}>{text}</span>}
        {icon && <Icon >{icon}</Icon>}</>}

    </button >
  )
}




export default Button