import style from './SearchList.module.scss'
import classnames from 'classnames/bind'
import Icon from '../Layout/Lib/Icon/Icon'
import { Children } from '../../types/Children'


const cx = classnames.bind(style)

const SearchList = ({ children }: Children) => {
  return (
    <div className={cx('wrapper')}>
      <Icon name='build' />
      {children}
    </div>
  )
}

export default SearchList