import classNames from 'classnames/bind'
import Image from 'next/image'
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '../../src/generated/graphql'
import { Button } from '../Lib/Button'
import styled from './Navbar.module.scss'

const cx = classNames.bind(styled)

type Props = {

}

const Navbar = ({ }: Props) => {

  const { data } = useMeQuery()
  const [dataLogout, { loading: loadingLogout }] = useLogoutMutation()

  const onLogout = async () => {
    await dataLogout({
      update(cache, data) {
        if (data.data) {
          cache.writeQuery<MeQuery>({ query: MeDocument, data: { me: null } })
          cache.modify({
            fields: {
              users() {
                return []
              }
            }
          })
        }
      }
    })
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
        {data?.me?.id ? <>
          <span>{data.me.email}</span>
          <Button handle={onLogout} loading={loadingLogout} icon="logout" text="logout" />

        </> :
          <>
            <Button link='/login' icon="login" text="Đăng nhập" />
            <Button link="/register" icon="person_add" text="Đăng ký" />
          </>}

      </div>

    </div>
  )
}

export default Navbar