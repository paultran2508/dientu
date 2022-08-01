import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import { useAlert } from 'react-alert'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { MeDocument, MeQuery, useLoginMutation } from '../../src/generated/graphql'
import { Button } from '../Lib/Button'
import Field, { HandleValueField } from '../Lib/Field'
import { ErrorFieldInput } from '../Lib/Field/Field'
import style from './Login.module.scss'

const cx = classNames.bind(style)

type ValuesField = {
  email: string
  password: string
}

type Props = {}

const Login = ({ }: Props) => {

  const [login, { loading }] = useLoginMutation()
  const alert = useAlert()
  const route = useRouter()
  const [values, setValues] = useState<ValuesField>({ email: '', password: '' })
  const [errors, setErrors] = useState<ErrorFieldInput[] | undefined>()


  const handleForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const res = await login({
      variables: { loginInput: values },
      update(cache, { data }) {
        data?.login.code === 200 && cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.login.user }
        })

      }
    })
    if (res.data?.login.code != 200 && res.data?.login.fieldError) {

      setErrors(res.data?.login.fieldError)

    }
    if (res.data?.login.code === 200) {
      setErrors(undefined)
      alert.success('đăng nhập thành công')
      route.push('/')
    }
  }
  const handleValue: HandleValueField = (value, fieldName) => {
    setValues(changeValues => ({ ...changeValues, [fieldName]: value }))
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('show-user')}>
      </div>
      <form onSubmit={handleForm}>
        <h1>Đăng Nhập</h1>
        <div className={cx('social')}>
          <Button text={
            <div className={cx('item-social')}>
              <FacebookIcon />
              <span>Login Facebook</span>
            </div>
          } />
          <Button text={<div className={cx('item-social')}>
            <GoogleIcon />
            <span>Login Google</span>
          </div>} />
        </div>
        <Field handleValueFiled={handleValue} errMess={errors?.filter(err => err.name === 'email')[0]?.mess} value={values.email} name="email" placeholder='Nhập email' />
        <Field handleValueFiled={handleValue} errMess={errors?.filter(err => err && err.name === 'password')[0]?.mess} value={values.password} name="password" placeholder='Nhập password' />
        <div className={cx('action')}>
          <Button loading={loading} submit text="Đăng nhập" />
          <Link href={'/register'} >đăng ký</Link>
        </div>
      </form>

    </div>
  )
}

Login.Layout = DefaultLayout

export default Login