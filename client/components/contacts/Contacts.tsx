import classNames from 'classnames/bind'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import style from './Contacts.module.scss'

const cx = classNames.bind(style)

type Props = {}

const Contacts = ({ }: Props) => {
  return (
    <div className={cx('wrapper')}>Lien He</div>
  )
}

Contacts.Layout = DefaultLayout

export default Contacts