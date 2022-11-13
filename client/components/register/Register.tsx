import classNames from 'classnames/bind'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Button } from '../Lib/Button'
import style from './Register.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Field, { HandleValueField } from '../Lib/Field';
import Link from 'next/link';
import { useRegisterMutation } from '../../src/generated/graphql';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import { ErrorFieldInput } from '../Lib/Field/Field';
import { FormEventHandler, useState } from 'react';

const cx = classNames.bind(style)

type ValuesField = {
  email: string
  password: string
  rePassword: string
}

type Props = {}

const Register = ({ }: Props) => {

  const [register, { loading }] = useRegisterMutation()

  const alert = useAlert()
  const route = useRouter()
  const [values, setValues] = useState<ValuesField>({ email: '', password: '', rePassword: "" })
  const [errors, setErrors] = useState<ErrorFieldInput[] | undefined | null>()



  const handleValue: HandleValueField = (value, fieldName) => {
    setValues(changeValues => ({ ...changeValues, [fieldName]: value }))
  }

  const handleForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await register({
      variables: { registerInput: values },
    })
    if (res.data?.register.code != 200 && res.data?.register.fieldErrors) {
      // console.log(res.data?.register.fieldErrors)
      const fieldErrors: ErrorFieldInput[] = res.data.register.fieldErrors.map(error => ({ message: error.name ?? "", name: error.message ?? "" }))

      setErrors(fieldErrors)

    }
    if (res.data?.register.code === 200) {
      setErrors(undefined)
      alert.success('Đăng ký thành công')
      route.push(`/login?email=${values.email}}`)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleForm}>
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

        <Field handleValueFiled={handleValue} errMess={errors?.filter(err => err.name === 'email')[0]?.message} value={values.email} name="email" placeholder='Nhập email' />
        <Field handleValueFiled={handleValue} errMess={errors?.filter(err => err.name === 'password')[0]?.message} value={values.password} name="password" placeholder='Nhập mật khẩu' />
        <Field handleValueFiled={handleValue} errMess={errors?.filter(err => err.name === 'rePassword')[0]?.message} value={values.rePassword} name="rePassword" placeholder='Nhập lại mật khẩu' />

        <div className={cx('action')}>
          {loading ? <Button text="loading" /> : <Button submit text="Đăng ký" />}

          <Link href={'/login'} >đăng nhập</Link>

        </div>

      </form>

    </div>
  )
}

Register.Layout = DefaultLayout

export default Register