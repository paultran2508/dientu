import classNames from 'classnames/bind'
import style from './sidebar.module.scss'


const cx = classNames.bind(style)

const Sidebar = () => {
  return (
    <div className={cx('sidebar')} >
      sidebar
    </div>
  )
}

export default Sidebar