import classNames from 'classnames/bind'
import { useState } from 'react'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Button } from '../Lib/Button'
import Content from './Content'
import style from './Test.module.scss'

const cx = classNames.bind(style)

type Props = {}

const Test = ({ }: Props) => {

  const [show, setShow] = useState({
    img: "aha",
    values: [{ imgs: ["a", "b"] }, { imgs: ["c", "d"] }]


  })

  console.log("render")

  return (
    <div className={cx('wrapper')}>
      <Button text="click here" handle={() => {
        setShow(shows => {
          let setSows = shows
          setSows.values[0].imgs[1] = "312331231231"
          return { ...setSows }
        })
      }} />
      <h1>{show.values.map(value => <Content imgs={value.imgs} key={value.imgs[0]} />)}</h1>
    </div>
  )
}

// Test.Layout = DefaultLayout

export default Test