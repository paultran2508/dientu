import { Icon } from "@mui/material"
import classNames from "classnames/bind"
import style from './button.module.scss'

const cx = classNames.bind(style)

interface PropsButton {
  icon?: string
  text?: string
  loading?: boolean
}

const Button = ({ icon, loading, text }: PropsButton) => {
  return (

    <button>
      {loading ? 'loading ... ' : (<>
        {icon ? <div className={cx('icon')}><Icon fontSize="inherit">{icon}</Icon></div> : ''}
        {text ? <span className={cx('text')} >{text}</span> : ''}

      </>)}

    </button>

  )
}

export default Button