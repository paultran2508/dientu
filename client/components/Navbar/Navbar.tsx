import classNames from 'classnames/bind'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../Lib/Button'
import styled from './Navbar.module.scss'

const cx = classNames.bind(styled)

type Props = {

}

const Navbar = ({ }: Props) => {

  const [loading, setLoading] = useState(false)
  const click = () => {
    setLoading(!loading)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <div className={cx('img')}>
          <Image width={'100'} height={'100'} className={cx('show')} src={require('../../assets/logo/commerce.png')} alt="logo" />
        </div>
        <h2>logo</h2>
      </div>
      <div className={cx('search')}>
        <input placeholder='Tim kiem' />
        <Button icon='search' />
      </div>
      <div className={cx('register')}>
        <Button loading={loading} icon="login" text="login" handle={click} />
        <Button loading={loading} icon="logout" text="logout" handle={click} />
      </div>
    </div>
  )
}

export default Navbar