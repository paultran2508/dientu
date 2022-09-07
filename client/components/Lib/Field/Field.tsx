import classNames from "classnames/bind"
// import { useEffect } from "react"
// import { useState } from "react"
import style from './Field.module.scss'
import { HandleValueField } from "./HandleValueField"


export type FieldInputProps = {
  name: string
  value?: string
  placeholder?: string
  handleValueFiled?: HandleValueField
  changeValue?: Values
  errors?: ErrorFieldInput[]
  errMess?: string | null | undefined
}

type Values = { any: string }

export type ErrorFieldInput = {
  name: string,
  message: string | null
}

const cx = classNames.bind(style)

const Field = ({ value, handleValueFiled, placeholder, name, errMess }: FieldInputProps) => {

  // console.log('login')
  return (
    <div className={cx('wrapper')}>
      <label className={cx({
        ['err-label']: errMess
      })}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label>
      <input
        onChange={(e) => {
          handleValueFiled && handleValueFiled(e.target.value, name)
        }} value={value} placeholder={placeholder} />
      <p className={cx({
      })}>{errMess}</p>
    </div>
  )
}

export default Field