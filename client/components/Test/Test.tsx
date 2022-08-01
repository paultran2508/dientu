import classNames from 'classnames/bind'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import style from './Test.module.scss'

const cx = classNames.bind(style)

type Props = {}

const Test = ({ }: Props) => {
  return (
    <div className={cx('wrapper')}>Lien He</div>
  )
}

Test.Layout = DefaultLayout

export default Test