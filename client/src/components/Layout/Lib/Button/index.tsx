import { Button } from '@mui/material'
import classnames from 'classnames/bind'
import React from 'react'
import style from './Button.module.scss'

interface ButtonType {
  className?: string[]
  text: boolean
  onClick?: (e: React.MouseEvent) => void
  children: React.ReactElement

}


const cx = classnames.bind(style)


const ButtonEl = ({ children }: ButtonType) => {
  // const {  } = attr

  const classTag: string[] = [

    'button-style'

  ]
  // const Tag: keyof JSX.IntrinsicElements = text ? 'span' : 'button'
  return <>
    <Button
      children={children}
      className={cx(classTag)} />


  </>

}



export default ButtonEl