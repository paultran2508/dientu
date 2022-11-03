import classNames from 'classnames/bind'
import { useState } from 'react'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Button } from '../Lib/Button'
import style from './Test.module.scss'

const cx = classNames.bind(style)

type Props = {}

const Test = ({ }: Props) => {

  const [show, setShow] = useState<number>(0)

  return (
    <div className={cx('wrapper')}>
      <Button text="click here" handle={() => {
        setShow(n => {
          console.log(1)
          return n + 1

        })
      }} />
      <h1>{show}</h1>
    </div>
  )
}

// Test.Layout = DefaultLayout

export default Test