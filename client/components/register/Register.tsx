import classNames from 'classnames/bind'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Button } from '../Lib/Button'
import style from './Register.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Field from '../Lib/Field';
import Link from 'next/link';

const cx = classNames.bind(style)

type Props = {}

const Register = ({ }: Props) => {

  const handle = () => {

  }
  const clickForm = () => {

  }

  return (
    <div className={cx('wrapper')}>
      <form >
        <h1>Đăng Ký</h1>
        <div className={cx('social')}>
          <Button text={
            <div className={cx('item-social')}>
              <FacebookIcon />
              <span>Login Facebook</span>
            </div>

          } />
          <Button text={
            <div className={cx('item-social')}>
              <GoogleIcon />
              <span>Login Google</span>
            </div>

          } />
        </div>
        <Field value="sss" handle={handle} err="" name="email" placeholder='Nhập email' />
        <Field value="" handle={handle} err="" name="password" placeholder='Nhập password' />
        <Field value="" handle={handle} err="" name="re-password" placeholder='Nhập lại password' />
        <div className={cx('action')}>
          <Button handle={clickForm} text="Đăng ký" />
          <Link href={'/login'} >đăng nhập</Link>

        </div>

      </form>

    </div>
  )
}

Register.Layout = DefaultLayout

export default Register